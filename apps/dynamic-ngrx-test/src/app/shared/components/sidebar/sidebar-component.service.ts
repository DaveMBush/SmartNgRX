import { Injectable } from '@angular/core';

import { assert } from '@davembush/dynamic-ngrx/common/assert.function';
import { castTo } from '@davembush/dynamic-ngrx/common/cast-to.function';
import { ProxyArray } from '@davembush/dynamic-ngrx/types/proxy-array.interface';

import type { SidebarComponent } from './sidebar.component';
import { SidebarCommonSourceNode } from './sidebar-common-source-node.interface';
import { SidebarNode } from './sidebar-node.interface';

@Injectable({ providedIn: 'root' })
export class SidebarComponentService {
  private expandMap = new Map<string, boolean>();
  private component: SidebarComponent | null = null;

  set form(component: SidebarComponent) {
    this.component = component;
  }

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

  applyRange(): void {
    const component = this.component;
    assert(!!component, 'component is null');
    component.fullDataSource = this.transform(
      component.location?.children ?? [],
      0,
      component.range.start,
      component.range.end,
    );
    component.dataSource = component.fullDataSource.slice(
      component.range.start,
      component.range.end,
    );
  }

  transform(
    children: (SidebarCommonSourceNode | string)[],
    level: number,
    startRange: number,
    endRange: number,
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
          const childNodes = this.transform(
            castTo<SidebarCommonSourceNode>(children[i]).children,
            level + 1,
            startRange - result.length,
            endRange - result.length,
          );
          childNodes.forEach((child) => result.push(child));
        }
      },
    );
    return result;
  }

  private isExpanded(node: { id: string; level: number }): boolean {
    return this.expandMap.get(node.level + ':' + node.id) ?? false;
  }
}
