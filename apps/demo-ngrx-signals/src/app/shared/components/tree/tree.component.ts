import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTreeModule } from '@angular/material/tree';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { debounceTime, distinctUntilChanged, switchMap, timer } from 'rxjs';

import { Location } from '../../locations/location.interface';
import { NodeEditorComponent } from '../node-editor/node-editor.component';
import { TreeComponentService } from './tree-component.service';
import { TreeNode } from './tree-node.interface';

@Component({
  providers: [TreeComponentService],
  selector: 'dmb-tree',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    ScrollingModule,
    NodeEditorComponent,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent implements AfterViewInit {
  private isInitialized = false;
  private treeComponentService = inject(TreeComponentService);
  locations$ = input.required<Location[] | null>();
  locationId$ = input<number | string | null>('');
  location$ = input<Location | null>(null);
  readonly locationChanged = output<string>();

  @ViewChild(CdkVirtualScrollViewport)
  virtualScroll!: CdkVirtualScrollViewport;

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
  waitForScroll = false;
  destroyRef = inject(DestroyRef);

  constructor(private cd: ChangeDetectorRef) {
    this.treeComponentService.form = this;
    const context = this;
    effect(function watchLocation() {
      const location = context.location$();
      if (context.isInitialized && location !== null && location !== undefined) {
        context.treeComponentService.applyRange();
        context.cd.markForCheck();
      }
    });
  }

  trackBy(index: number, _: TreeNode): string {
    return index.toString();
  }

  levelAccessor(node: TreeNode): number {
    return node.level;
  }

  selectionChanged(event: string): void {
    this.locationChanged.emit(event);
  }

  hasChild(_: number, node: TreeNode): boolean {
    return node.hasChildren;
  }

  toggleExpand(node: TreeNode): void {
    this.treeComponentService.toggleExpand(node);
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
    const virtualScroll = this.virtualScroll;
    const context = this;
    timer(1000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(function scrollToPosition() {
          virtualScroll.scrollToIndex(position - 1);
          return timer(500);
        }),
      )
      .subscribe(function addChildScrollToPositionSubscribeFunction() {
        context.treeComponentService.applyRange();
        context.cd.markForCheck();
        context.waitForScroll = false;
      });
  }

  ngAfterViewInit(): void {
    this.isInitialized = true;
    const context = this;
    // this stream watches for scrolling
    this.virtualScroll.renderedRangeStream
      .pipe(debounceTime(100), takeUntilDestroyed(this.destroyRef))
      .subscribe(function scrollRangeStreamSubscribeFunction(range) {
        context.range = range;
        context.treeComponentService.applyRange();
      });
    // this stream watches for scroll height changes
    this.virtualScroll.renderedRangeStream
      .pipe(
        debounceTime(100),
        distinctUntilChanged(function distinctUntilChangedRange(a, b) {
          return a.end - a.start === b.end - b.start;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(function scrollRangeStreamSubscribeFunction(range) {
        context.range = range;
        context.treeComponentService.applyRange();
      });
  }
}
