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

import { Location } from '../../store/locations/location.interface';
import { SidebarComponentService } from './sidebar-component.service';
import { SidebarNode } from './sidebar-node.interface';

@Component({
  providers: [SidebarComponentService],
  selector: 'dmb-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnChanges, AfterViewInit {
  private sidebarComponentService = inject(SidebarComponentService);
  @Input() locations: Location[] | null = [];
  @Input() locationId: number | string | null = '';
  @Input() location: Location | null = null;
  @Output() readonly locationChanged = new EventEmitter<string>();
  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  range = { start: 0, end: 6 };

  treeControl = new FlatTreeControl<SidebarNode>(
    (node) => node.level,
    (node) => node.hasChildren,
  );

  dataSource: SidebarNode[] = [];
  fullDataSource: SidebarNode[] = [];
  selectedNode = '';
  constructor() {
    this.sidebarComponentService.form = this;
  }

  selectionChanged(event: MatSelectChange): void {
    this.locationChanged.emit(event.value as string);
  }

  hasChild = (_: number, node: SidebarNode): boolean => {
    return node.hasChildren;
  };

  toggleExpand(node: SidebarNode): void {
    this.sidebarComponentService.toggleExpand(node);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'] !== undefined) {
      this.sidebarComponentService.applyRange();
    }
  }

  selectNode(node: SidebarNode): void {
    this.selectedNode = node.id;
  }

  ngAfterViewInit(): void {
    this.virtualScroll.renderedRangeStream.subscribe((range) => {
      this.range = range;
      this.sidebarComponentService.applyRange();
    });
  }
}
