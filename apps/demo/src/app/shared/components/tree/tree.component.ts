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

import { assert } from '@smart/smart-ngrx/common/assert.function';

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
  private sidebarComponentService = inject(TreeComponentService);
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
  addingNode = '';
  addingParent: TreeNode | null = null;
  addMenuOpenedNode = '';

  constructor() {
    this.sidebarComponentService.form = this;
  }

  selectionChanged(event: MatSelectChange): void {
    this.locationChanged.emit(event.value as string);
  }

  hasChild = (_: number, node: TreeNode): boolean => {
    return node.hasChildren;
  };

  toggleExpand(node: TreeNode): void {
    this.sidebarComponentService.toggleExpand(node);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'] !== undefined) {
      this.sidebarComponentService.applyRange();
    }
  }

  selectNode(node: TreeNode): void {
    this.selectedNode = node.level + ':' + node.node.id;
  }

  editNode(node: TreeNode): void {
    this.editingNode = node.level + ':' + node.node.id;
  }

  cancelEdit(node: TreeNode): void {
    if (this.addingNode === node.level + ':' + node.node.id) {
      assert(!!this.addingParent, 'addingParent is null');
      this.sidebarComponentService.removeChild(node, this.addingParent);
    }
    this.addingParent = null;
    this.editingNode = '';
    this.addingNode = '';
    node.name = node.node.name;
  }

  saveNode(node: TreeNode): void {
    if (this.addingNode === node.level + ':' + node.node.id) {
      this.addingParent = null;
    }
    this.editingNode = '';
    this.addingNode = '';
    node.node.name = node.name;
  }

  addMenuOpened(node: TreeNode): void {
    this.addMenuOpenedNode = node.level + ':' + node.node.id;
  }

  addMenuClosed(_: TreeNode): void {
    this.addMenuOpenedNode = '';
  }

  addChild(parent: TreeNode, type: string): void {
    if (parent.isExpanded === false) {
      this.toggleExpand(parent);
    }
    this.sidebarComponentService.addChild(
      { id: type + ':new', name: `New ${type}`, children: [] },
      parent,
    );
    this.addingNode = `${parent.level + 1}:${type}:new`;
    this.addingParent = parent;
  }

  ngAfterViewInit(): void {
    this.virtualScroll.renderedRangeStream.subscribe((range) => {
      this.range = range;
      this.sidebarComponentService.applyRange();
    });
  }
}
