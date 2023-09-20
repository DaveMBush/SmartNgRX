import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { castTo } from '@davembush/dynamic-ngrx/common/cast-to.function';
import { ProxyArray } from '@davembush/dynamic-ngrx/types/proxy-array.interface';

import { Location } from '../../store/locations/location.interface';
import { SidebarCommonSourceNode } from './sidebar-common-source-node';
import { SidebarNode } from './sidebar-node';

@Component({
  selector: 'dmb-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnChanges, AfterViewInit {
  @Input() location: Location | null = null;
  locationName = '';
  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;
  range = { start: 0, end: 6 };
  expandMap = new Map<string, boolean>();

  treeControl = new FlatTreeControl<SidebarNode>(
    (node) => node.level,
    (node) => node.hasChildren
  );

  dataSource: SidebarNode[] = [];
  fullDataSource: SidebarNode[] = [];
  selectedNode = '';
  hasChildren = false;

  constructor(private store: Store) {}

  hasChild = (_: number, node: SidebarNode): boolean => {
    return node.hasChildren;
  };

  toggleExpand(node: SidebarNode): void {
    if (this.isExpanded(node)) {
      this.expandMap.delete(node.level + ':' + node.id);
      node.isExpanded = false;
    } else {
      this.expandMap.set(node.level + ':' + node.id, true);
      node.isExpanded = true;
    }
    this.applyRange();
  }

  transform(
    children: (SidebarCommonSourceNode | string)[],
    level: number,
    startRange: number,
    endRange: number
  ): SidebarNode[] {
    const result: SidebarNode[] = [];
    if (children.length === 0) {
      return [];
    }
    castTo<ProxyArray<SidebarCommonSourceNode>>(children).rawArray.forEach(
      (c, i) => {
        let node: SidebarCommonSourceNode | string = c;
        if (startRange <= result.length && result.length <= endRange) {
          node = children[i];
        }
        const r =
          typeof node === 'string'
            ? { id: node, name: '', level, hasChildren: false }
            : {
                id: node.id,
                name: node.name,
                level,
                hasChildren: Boolean(node.children?.length),
                isExpanded: this.isExpanded({ id: node.id, level }),
              };
        result.push(r);
        if (this.isExpanded(r)) {
          this.transform(
            castTo<SidebarCommonSourceNode>(children[i]).children ?? [],
            level + 1,
            startRange - result.length,
            endRange - result.length
          ).forEach((child) => result.push(child));
        }
      }
    );
    return result;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['location'] !== undefined) {
      this.locationName = '';
      this.applyRange();
      if (this.location) {
        this.locationName = this.location.name;
      }
    }
  }

  applyRange(): void {
    this.fullDataSource = this.transform(
      this.location?.children || [],
      0,
      this.range.start,
      this.range.end
    );
    this.dataSource = this.fullDataSource.slice(
      this.range.start,
      this.range.end
    );
  }

  selectNode(node: SidebarNode): void {
    this.selectedNode = node.id;
    this.hasChildren = node.hasChildren;
  }

  ngAfterViewInit(): void {
    // debouncing looks like a good idea here but 1) this only
    // sends distinct values and 2) the display goes funky when
    // we use debounceTime.  Under normal circumstances (ie, proper
    // buffering) this won't get called enough times for debounce
    // to be beneficial.
    this.virtualScroll.renderedRangeStream.subscribe((range) => {
      // we might be able to optimize this by changing the range
      // to only what is new so that we don't have to re-compute
      // everything.  OTOH, this may be an over-optimization since
      // we have to iterate from the top anyhow.
      this.range = range;
      this.applyRange();
    });
  }

  private isExpanded(node: { id: string; level: number }): boolean {
    return this.expandMap.get(node.level + ':' + node.id) ?? false;
  }
}
