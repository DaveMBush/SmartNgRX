import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

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
  @Input() locations: Location[] | null = [];
  @Input() locationId: number | string | null = '';
  @Input() location: Location | null = null;
  @Output() readonly locationChanged = new EventEmitter<string>();
  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  // end = -1 to force first render to be everything that can be displayed
  range = { start: 0, end: -1 };

  treeControl = new FlatTreeControl<TreeNode>(
    (node) => node.level,
    (node) => node.hasChildren,
  );

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

  constructor() {
    this.treeComponentService.form = this;
  }

  selectionChanged(event: MatSelectChange): void {
    this.locationChanged.emit(event.value as string);
  }

  hasChild = (_: number, node: TreeNode): boolean => {
    return node.hasChildren;
  };

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
    this.editingContent = '';
  }

  saveNode(node: TreeNode): void {
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
    this.editingContent = `New ${type}`;
    this.treeComponentService.addChild(
      { id: type + ':new', name: this.editingContent, children: [] },
      parent,
    );
    this.addingNode = `${parent.level + 1}:${type}:new`;
    this.addingParent = parent;
  }

  ngAfterViewInit(): void {
    this.virtualScroll.renderedRangeStream.subscribe((range) => {
      this.range = range;
      this.treeComponentService.applyRange();
    });
  }
}
