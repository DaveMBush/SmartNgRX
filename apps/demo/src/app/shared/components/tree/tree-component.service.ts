import { Injectable } from '@angular/core';
import { assert, SmartArray } from '@smarttools/smart-ngrx';

import { CommonSourceNode } from './common-source-node.interface';
import { expandedMap } from './expanded-map.class';
import type { TreeComponent } from './tree.component';
import { TreeNode } from './tree-node.interface';
@Injectable()
export class TreeComponentService {
  private component: TreeComponent | null = null;

  set form(component: TreeComponent) {
    this.component = component;
  }

  static isNodeAtPosition(
    node: TreeNode | undefined,
    parent: TreeNode,
  ): boolean {
    return (
      node !== undefined &&
      node.node.id === parent.node.id &&
      node.level === parent.level + 1
    );
  }

  toggleExpand(node: TreeNode): void {
    if (this.isExpanded(node)) {
      expandedMap.delete(node.parentId, node.level, node.node.id);
      node.isExpanded = false;
    } else {
      expandedMap.set(node.parentId, node.level, node.node.id, true);
      node.isExpanded = true;
    }
    this.applyRange();
  }

  applyRange(): void {
    const component = this.component;
    assert(!!component, 'component is null');
    // no use in painting if there is nothing to paint
    if (component.location$() === undefined || component.location$() === null) {
      return;
    }
    component.fullDataSource = this.transform({
      parentId: component.locationId$() as string,
      children: component.location$()!.departments as SmartArray<
        CommonSourceNode,
        CommonSourceNode
      >,
      level: 0,
      startRange: component.range.start,
      endRange: component.range.end,
    });
    // if the end range is -1, there is nothing to paint
    // so we just set dataSource to an empty array
    if (component.range.end === -1) {
      component.dataSource = [];
    } else {
      component.dataSource = component.fullDataSource.slice(
        component.range.start,
        component.range.end,
      );
    }
  }

  transform({
    parentId,
    children,
    level,
    startRange,
    endRange,
  }: {
    parentId: string;
    children: SmartArray<CommonSourceNode, CommonSourceNode>;
    level: number;
    startRange: number;
    endRange: number;
  }): TreeNode[] {
    const result: TreeNode[] = [];
    if (children.length === 0) {
      return [];
    }
    for (let i = 0; i < children.length; i++) {
      if (endRange === -1 || i > endRange) {
        result.length += children.length - i;
        return result;
      }
      this.transformTreeNode({
        parentId,
        children,
        result,
        index: i,
        level,
        startRange,
        endRange,
      });
    }
    return result;
  }

  addChild(row: CommonSourceNode, parent: TreeNode): number {
    if (parent.isExpanded === false) {
      this.toggleExpand(parent);
    }

    parent.node.children.addToStore!(row, parent.node);
    const index = this.component!.fullDataSource.findIndex(
      function findNodeIndex(node) {
        return TreeComponentService.isNodeAtPosition(node, parent);
      },
    );
    return parent.node.children.length + index;
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
    this.component!.editingContent = '';
    if (this.component!.addingNode.length === 0) {
      node.name = node.node.name;
    }
    this.component!.addingNode = '';
  }

  removeChild(row: TreeNode, parent: TreeNode): void {
    parent.node.children.removeFromStore!(row.node, parent.node);
  }

  private isExpanded(node: TreeNode): boolean {
    return expandedMap.get(node.parentId, node.level, node.node.id);
  }

  private getTreeNode(
    currentNode: CommonSourceNode | string,
    parentId: string,
    level: number,
    isExpanded: boolean,
  ): TreeNode {
    return typeof currentNode === 'string'
      ? ({
          parentId,
          node: { id: currentNode, isLoading: true },
          name: '',
          level,
          hasChildren: false,
          isExpanded: false,
        } as TreeNode)
      : ({
          parentId,
          name: currentNode.name,
          node: currentNode,
          level,
          hasChildren: Boolean(currentNode.children?.length),
          isExpanded,
        } as TreeNode);
  }

  private transformTreeNode(params: {
    parentId: string;
    children: SmartArray<CommonSourceNode, CommonSourceNode>;
    result: TreeNode[];
    index: number;
    level: number;
    startRange: number;
    endRange: number;
  }): void {
    const { parentId, children, result, index, level, startRange, endRange } =
      params;
    const isExpanded = Boolean(
      expandedMap.get(parentId, level, children.getIdAtIndex!(index)!),
    );
    let currentNode: CommonSourceNode | string | null = null;
    if (
      (startRange <= result.length && result.length <= endRange) ||
      isExpanded
    ) {
      currentNode = children[index];
    } else {
      result.length++;
      return;
    }
    const treeNode = this.getTreeNode(currentNode, parentId, level, isExpanded);
    result.push(treeNode);
    if (isExpanded) {
      const childNodes = this.transform({
        parentId: treeNode.node.id,
        children: (currentNode as CommonSourceNode).children,
        level: level + 1,
        startRange: startRange - result.length,
        endRange: endRange - result.length,
      });
      result.push(...childNodes);
    }
  }
}
