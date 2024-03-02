import { Injectable } from '@angular/core';

import { assert } from '@smart/smart-ngrx/common/assert.function';
import { castTo } from '@smart/smart-ngrx/common/cast-to.function';
import { forNext } from '@smart/smart-ngrx/common/for-next.function';
import { ArrayProxy } from '@smart/smart-ngrx/selector/array-proxy.class';

import { Department } from '../../department/department.interface';
import { DepartmentChild } from '../../department-children/department-child.interface';
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
      this.expandMap.delete(node.level + ':' + node.node.id);
      node.isExpanded = false;
    } else {
      this.expandMap.set(node.level + ':' + node.node.id, true);
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
    forNext(castTo<{ rawArray: string[] }>(children).rawArray, (c, i) => {
      let node: CommonSourceNode | string = c;
      if (startRange <= result.length && result.length <= endRange) {
        node = children[i];
      }
      const r =
        typeof node === 'string'
          ? { node: { id: node }, name: '', level, hasChildren: false }
          : {
              name: node.name,
              node,
              level,
              hasChildren: Boolean(node.children?.length),
              isExpanded: this.isExpanded({ node, level } as TreeNode),
            };
      result.push(r as TreeNode);
      if (this.isExpanded(r as TreeNode)) {
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

  addChild(row: DepartmentChild, parent: TreeNode): void {
    castTo<ArrayProxy<Department, DepartmentChild>>(parent.node.children).add(
      row,
      parent.node,
    );
  }

  removeChild(row: TreeNode, parent: TreeNode): void {
    castTo<ArrayProxy<Department, DepartmentChild>>(
      parent.node.children,
    ).remove(row.node, parent.node);
  }

  private isExpanded(node: TreeNode): boolean {
    return this.expandMap.get(node.level + ':' + node.node.id) ?? false;
  }
}
