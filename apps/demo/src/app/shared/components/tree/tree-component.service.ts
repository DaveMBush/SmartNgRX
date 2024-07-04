import { Injectable } from '@angular/core';

import { assert, forNext, SmartArray } from '@smart/smart-ngrx';

import { DepartmentChild } from '../../department-children/department-child.interface';
import { CommonSourceNode } from './common-source-node.interface';
import type { TreeComponent } from './tree.component';
import { TreeNode } from './tree-node.interface';

@Injectable()
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
      component.location()?.departments ?? [],
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
    children: (CommonSourceNode | string)[] & SmartArray,
    level: number,
    startRange: number,
    endRange: number,
  ): TreeNode[] {
    const result: TreeNode[] = [];
    if (children.length === 0) {
      return [];
    }
    forNext(children.rawArray!, (c, i) => {
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
          (children[i] as CommonSourceNode).children,
          level + 1,
          startRange - result.length,
          endRange - result.length,
        );
        result.push(...childNodes);
      }
    });
    return result;
  }

  addChild(row: DepartmentChild, parent: TreeNode): void {
    if (parent.isExpanded === false) {
      this.toggleExpand(parent);
    }

    parent.node.children.addToStore!(row, parent.node);
  }

  deleteNode(node: TreeNode): void {
    // because delete is an optional method,
    // but it actually exist by definition,
    // we can safely assert that it exist.
    node.node.delete!();
  }

  cancelEdit(node: TreeNode): void {
    if (this.component!.addingParent) {
      this.removeChild(node, this.component!.addingParent);
    }
    this.component!.addingParent = null;
    this.component!.editingNode = '';
    this.component!.addingNode = '';
    node.name = node.node.name;
  }

  removeChild(row: TreeNode, parent: TreeNode): void {
    parent.node.children.removeFromStore!(row.node, parent.node);
  }

  private isExpanded(node: TreeNode): boolean {
    return this.expandMap.get(node.level + ':' + node.node.id) ?? false;
  }
}
