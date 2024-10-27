import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnChanges,
  output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap, timer } from 'rxjs';

import { Location } from '../../locations/location.interface';
import { TreeComponentService } from './tree-component.service';
import { TreeNode } from './tree-node.interface';

@Component({
  providers: [TreeComponentService],
  selector: 'dmb-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent implements OnChanges, AfterViewInit {
  private treeComponentService = inject(TreeComponentService);
  locations = input.required<Location[] | null>();
  locationId = input<number | string | null>('');
  location = input<Location | null>(null);
  readonly locationChanged = output<string>();

  @ViewChild(CdkVirtualScrollViewport)
  virtualScroll!: CdkVirtualScrollViewport;

  // end = -1 to force first render to be everything that can be displayed
  range = { start: 0, end: -1 };

  dataSource: TreeNode[] = [];
  fullDataSource: TreeNode[] = [];
  selectedNode = '';
  editingNode = '';
  // we can't edit the node in place because it will get overwritten when the
  // data updates.
  editingContent = '';
  addingNode = '';
  addingParent: TreeNode | null = null;
  addMenuOpenedNode = '';
  destroyRef = inject(DestroyRef);

  constructor(private cd: ChangeDetectorRef) {
    this.treeComponentService.form = this;
  }

  trackBy(index: number, _: TreeNode): string {
    return index.toString();
  }

  levelAccessor: (dataNode: TreeNode) => number = (node: TreeNode) =>
    node.level;

  selectionChanged(event: string): void {
    this.locationChanged.emit(event);
  }

  hasChild(_: number, node: TreeNode): boolean {
    return node.hasChildren;
  }

  toggleExpand(node: TreeNode): void {
    this.treeComponentService.toggleExpand(node);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'] !== undefined) {
      this.treeComponentService.applyRange();
    }
  }

  selectNode(node: TreeNode): void {
    this.selectedNode = node.level + ':' + node.node.id;
  }

  editNode(node: TreeNode): void {
    this.editingNode = node.level + ':' + node.node.id;
    this.editingContent = node.name;
  }

  deleteNode(node: TreeNode): void {
    this.treeComponentService.deleteNode(node);
  }

  cancelEdit(node: TreeNode): void {
    this.treeComponentService.cancelEdit(node);
  }

  saveNode(node: TreeNode): void {
    if (this.waitForScroll) {
      return;
    }
    this.addingParent = null;
    this.editingNode = '';
    this.addingNode = '';
    node.node.name = this.editingContent;
    this.editingContent = '';
  }

  addMenuOpened(node: TreeNode): void {
    this.addMenuOpenedNode = node.level + ':' + node.node.id;
  }

  addMenuClosed(_: TreeNode): void {
    this.addMenuOpenedNode = '';
  }

  waitForScroll = false;
  addChild(parent: TreeNode, type: string): void {
    this.waitForScroll = true;
    this.editingContent = `New ${type}`;
    const position = this.treeComponentService.addChild(
      {
        id: type + ':new',
        name: this.editingContent,
        children: [],
      },
      parent,
    );
    this.addingNode = `${parent.level + 1}:${type}:new`;
    this.addingParent = parent;
    // give the tree time to update
    // there is probably a better way to do this
    // but this is just a demo
    timer(1000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => {
          this.virtualScroll.scrollToIndex(position - 1);
          return timer(500);
        }),
      )
      .subscribe(() => {
        this.treeComponentService.applyRange();
        this.cd.markForCheck();
        this.waitForScroll = false;
      });
  }

  ngAfterViewInit(): void {
    // this stream watches for scrolling
    this.virtualScroll.renderedRangeStream
      .pipe(debounceTime(100), takeUntilDestroyed(this.destroyRef))
      .subscribe((range) => {
        this.range = range;
        this.treeComponentService.applyRange();
      });
    // this stream watching for scroll height changes
    this.virtualScroll.renderedRangeStream
      .pipe(
        distinctUntilChanged((a, b) => a.end - a.start === b.end - b.start),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((range) => {
        this.range = range;
        this.treeComponentService.applyRange();
      });
  }
}
