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
  private sidebarComponentService = inject(TreeComponentService);
  @Input() locations: Location[] | null = [];
  @Input() locationId: number | string | null = '';
  @Input() location: Location | null = null;
  @Output() readonly locationChanged = new EventEmitter<string>();
  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  range = { start: 0, end: 6 };

  treeControl = new FlatTreeControl<TreeNode>(
    (node) => node.level,
    (node) => node.hasChildren,
  );

  dataSource: TreeNode[] = [];
  fullDataSource: TreeNode[] = [];
  selectedNode = '';
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
    this.selectedNode = node.id;
  }

  ngAfterViewInit(): void {
    this.virtualScroll.renderedRangeStream.subscribe((range) => {
      this.range = range;
      this.sidebarComponentService.applyRange();
    });
  }
}
