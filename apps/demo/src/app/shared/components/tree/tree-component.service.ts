import { Injectable } from '@angular/core';

import { assert } from '@smart/smart-ngrx/common/assert.function';
import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import { forNext } from '@smart/smart-ngrx/common/for-next.function';
import { ArrayProxy } from '@smart/smart-ngrx/selector/array-proxy.class';

import { CommonSourceNode } from './common-source-node.interface';
import type { TreeComponent } from './tree.component';
import { TreeNode } from './tree-node.interface';

@Injectable({ providedIn: 'root' })
export class TreeComponentService {
  private expandMap = new Map<string, boolean>();
  private component: TreeComponent | null = null;

  set form(component: TreeComponent) {
    this.component = component;
  }

  toggleExpand(node: TreeNode): void {
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
      component.location?.departments ?? [],
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
    children: (CommonSourceNode | string)[],
    level: number,
    startRange: number,
    endRange: number,
  ): TreeNode[] {
    const result: TreeNode[] = [];
    if (children.length === 0) {
      return [];
    }
    forNext(castTo<ArrayProxy<CommonSourceNode>>(children).rawArray, (c, i) => {
      let node: CommonSourceNode | string = c;
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
          castTo<CommonSourceNode>(children[i]).children,
          level + 1,
          startRange - result.length,
          endRange - result.length,
        );
        forNext(childNodes, (child) => {
          result.push(child);
        });
      }
    });
    return result;
  }

  private isExpanded(node: { id: string; level: number }): boolean {
    return this.expandMap.get(node.level + ':' + node.id) ?? false;
  }
}
