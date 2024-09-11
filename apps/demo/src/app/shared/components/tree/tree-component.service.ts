import { Injectable } from '@angular/core';
import { assert, forNext, SmartArray } from '@smarttools/smart-ngrx';

import { VirtualArrayFlagService } from '../../virtual-array-flag.service';
import { CommonSourceNode } from './common-source-node.interface';
import type { TreeComponent } from './tree.component';
import { TreeNode } from './tree-node.interface';

@Injectable()
export class TreeComponentService {
  private expandMap = new Map<string, boolean>();
  private component: TreeComponent | null = null;

  constructor(private virtualArrayFlagService: VirtualArrayFlagService) {}

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
    // no use in painting if there is nothing to paint
    if (component.location() === undefined || component.location() === null) {
      return;
    }
    component.fullDataSource = this.transform(
      component.location()!.departments as SmartArray<
        CommonSourceNode,
        CommonSourceNode
      >,
      0,
      component.range.start,
      component.range.end,
    );
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

  transform(
    children: SmartArray<CommonSourceNode, CommonSourceNode>,
    level: number,
    startRange: number,
    endRange: number,
  ): TreeNode[] {
    const result: TreeNode[] = [];
    if (children.length === 0) {
      return [];
    }
    forNext(children.rawArray!, (c, i) => {
      this.transformTreeNode({
        children,
        result,
        node: c,
        index: i,
        level,
        startRange,
        endRange,
      });
    });
    return result;
  }

  addChild(row: CommonSourceNode, parent: TreeNode): void {
    if (parent.isExpanded === false) {
      this.toggleExpand(parent);
    }

    if (
      this.virtualArrayFlagService.virtualArrayFlag &&
      parent.node.virtualChildren !== undefined
    ) {
      parent.node.virtualChildren.addToStore!(row, parent.node);
    } else {
      parent.node.children.addToStore!(row, parent.node);
    }
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

  private transformTreeNode(params: {
    children: SmartArray<CommonSourceNode, CommonSourceNode>;
    result: TreeNode[];
    node: CommonSourceNode | string;
    index: number;
    level: number;
    startRange: number;
    endRange: number;
  }): void {
    const { children, result, node, index, level, startRange, endRange } =
      params;
    let currentNode: CommonSourceNode | string = node;
    if (startRange <= result.length && result.length <= endRange) {
      currentNode = children[index];
    } else {
      result.length++;
      return;
    }
    const treeNode =
      typeof currentNode === 'string'
        ? {
            node: { id: currentNode, isLoading: true },
            name: '',
            level,
            hasChildren: false,
          }
        : {
            name: currentNode.name,
            node: currentNode,
            level,
            hasChildren: Boolean(currentNode.children?.length),
            isExpanded: this.isExpanded({
              node: currentNode,
              level,
            } as TreeNode),
        };
    result.push(treeNode as TreeNode);
    if (this.isExpanded(treeNode as TreeNode)) {
      const childNodes = this.transform(
        /* istanbul ignore next -- trivial */
        level === 0 && this.virtualArrayFlagService.virtualArrayFlag
          ? (currentNode as CommonSourceNode).virtualChildren
          : (currentNode as CommonSourceNode).children,
        level + 1,
        startRange - result.length,
        endRange - result.length,
      );
      result.push(...childNodes);
    }
  }
}
