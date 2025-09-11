import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { castTo, SmartArray } from '@smarttools/smart-signals';

import { Department } from '../../department/department.interface';
import { CommonSourceNode } from './common-source-node.interface';
import { expandedMap } from './expanded-map.class';
import { TreeComponent } from './tree.component';
import { TreeComponentService } from './tree-component.service';
import { TreeNode } from './tree-node.interface';

interface MockComponentService {
  transformTreeNode(node: {
    parentId: string;
    children: SmartArray<CommonSourceNode, CommonSourceNode>;
    result: TreeNode[];
    index: number;
    level: number;
    startRange: number;
    endRange: number;
  }): TreeNode;
}

type PublicTreeComponentService = MockComponentService &
  Omit<TreeComponentService, 'transformTreeNode'>;

const department1a = 'department1-a';
const childNodeName = 'Child Node';
const parentNodeName = 'Parent Node';

describe('TreeComponentService', () => {
  // redefine service because virtualArrayFlagService is private
  let service: PublicTreeComponentService;
  let mockComponent: ComponentFixture<TreeComponent>;
  let componentInstance: TreeComponent;
  let fixture: TestBed;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [
        TreeComponent,
        FormsModule,
        CommonModule,
        ScrollingModule,
        MatInputModule,
        MatTreeModule,
        MatFormFieldModule,
        MatTabsModule,
        MatSelectModule,
      ],
      providers: [TreeComponentService],
    });
    service = TestBed.inject(TreeComponentService) as unknown as typeof service;

    // Mock TreeComponent
    mockComponent = fixture.createComponent(TreeComponent);
    mockComponent.componentInstance.range = {
      start: 0,
      end: 6,
    };
    mockComponent.componentInstance.locationId$ = signal(
      '1',
    ) as unknown as typeof mockComponent.componentInstance.locationId$;
    mockComponent.componentInstance.location$ = signal(
      null,
    ) as unknown as typeof mockComponent.componentInstance.location$;
    mockComponent.componentInstance.locations$ = signal(
      [],
    ) as unknown as typeof mockComponent.componentInstance.locations$;
    componentInstance = mockComponent.componentInstance;
    service.form = componentInstance;
    mockComponent.detectChanges();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('When toggleExpand() is called', () => {
    beforeEach(() => {
      jest.spyOn(service, 'applyRange').mockImplementation(() => {
        return;
      });
    });
    it('should toggle node expansion on and off', () => {
      const node: TreeNode = {
        parentId: '1',
        node: {
          id: '1',
          name: 'node1',
          children: [],
        },
        name: 'node1',
        level: 0,
        isExpanded: false,
        hasChildren: true,
      };
      service.toggleExpand(node);
      expect(node.isExpanded).toBe(true);
      service.toggleExpand(node);
      expect(node.isExpanded).toBe(false);
    });
  });

  describe('when the form field is null', () => {
    it('applyRange should throw an error', () => {
      // we have to force the service to accept a null value
      // for the form for this test to run because we already
      // assigned it a value in the beforeEach
      castTo<{ form: null }>(service).form = null;
      expect(() => service.applyRange()).toThrow('component is null');
    });
  });

  describe('When applyRange() is called and only one element is in the array and the object has not resolved', () => {
    beforeEach(() => {
      componentInstance.location$ = signal({
        id: '1',
        name: 'location1',
        departments: new Proxy([] as Department[], {
          get(_, prop) {
            if (prop === 'getIdAtIndex') {
              return (__: number) => '1';
            }
            return '1';
          },
        }),
      }) as unknown as typeof componentInstance.location$;
      mockComponent.detectChanges();
      service.applyRange();
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource length of 1', () => {
      expect(componentInstance.fullDataSource$().length).toBe(1);
      expect(componentInstance.dataSource$().length).toBe(1);
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource [0].id of 1', () => {
      expect(componentInstance.fullDataSource$()[0].node.id).toBe('1');
      expect(componentInstance.dataSource$()[0].node.id).toBe('1');
    });
    it('should return fullDataSource and dataSource [0].name of ""', () => {
      expect(componentInstance.fullDataSource$()[0].name).toBe('');
      expect(componentInstance.dataSource$()[0].name).toBe('');
    });
    it('should return fullDataSource and dataSource [0].hasChildren false', () => {
      expect(componentInstance.fullDataSource$()[0].hasChildren).toBe(false);
      expect(componentInstance.dataSource$()[0].hasChildren).toBe(false);
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource [0].level of 0', () => {
      expect(componentInstance.fullDataSource$()[0].level).toBe(0);
      expect(componentInstance.dataSource$()[0].level).toBe(0);
    });
  });
  describe('When applyRange() is called and only one element is in the array and the object has been resolved', () => {
    beforeEach(() => {
      componentInstance.location$ = signal({
        id: '1',
        name: 'location1',
        departments: new Proxy([] as Department[], {
          get(_, prop) {
            if (prop === 'length') {
              return 1;
            }
            if (prop === 'getIdAtIndex') {
              return (__: number) => '1';
            }
            return {
              id: '1',
              name: 'department1',
              children: ['1'],
              hasChildren: true,
            };
          },
        }),
      }) as unknown as typeof componentInstance.location$;
      mockComponent.detectChanges();
      service.applyRange();
    });
    it('should return fullDataSource and dataSource length of 1', () => {
      expect(componentInstance.fullDataSource$().length).toBe(1);
      expect(componentInstance.dataSource$().length).toBe(1);
    });
    it('should return fullDataSource and dataSource [0].id of 1', () => {
      expect(componentInstance.fullDataSource$()[0].node.id).toBe('1');
      expect(componentInstance.dataSource$()[0].node.id).toBe('1');
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource [0].name of "department1"', () => {
      expect(componentInstance.fullDataSource$()[0].name).toBe('department1');
      expect(componentInstance.dataSource$()[0].name).toBe('department1');
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource [0].hasChildren true', () => {
      expect(componentInstance.fullDataSource$()[0].hasChildren).toBe(true);
      expect(componentInstance.dataSource$()[0].hasChildren).toBe(true);
    });
    it('should return fullDataSource and dataSource [0].level of 0', () => {
      expect(componentInstance.fullDataSource$()[0].level).toBe(0);
      expect(componentInstance.dataSource$()[0].level).toBe(0);
    });
  });
  describe('When applyRange() is called and only one element is in the array and the object has been resolved but no children array supplied', () => {
    beforeEach(() => {
      componentInstance.location$ = signal({
        id: '1',
        name: 'location1',
        departments: new Proxy([] as Department[], {
          get(_, prop) {
            if (prop === 'getIdAtIndex') {
              return (__: number) => '1';
            }
            if (prop === 'length') {
              return 1;
            }
            return {
              id: '1',
              name: 'department1',
              hasChildren: true,
            };
          },
        }),
      }) as unknown as typeof componentInstance.location$;
      mockComponent.detectChanges();
      service.applyRange();
    });
    it('should return fullDataSource and dataSource length of 1', () => {
      expect(componentInstance.fullDataSource$().length).toBe(1);
      expect(componentInstance.dataSource$().length).toBe(1);
    });
    it('should return fullDataSource and dataSource [0].id of 1', () => {
      expect(componentInstance.fullDataSource$()[0].node.id).toBe('1');
      expect(componentInstance.dataSource$()[0].node.id).toBe('1');
    });
    it('should return fullDataSource and dataSource [0].name of "department1"', () => {
      expect(componentInstance.fullDataSource$()[0].name).toBe('department1');
      expect(componentInstance.dataSource$()[0].name).toBe('department1');
    });
    it('should return fullDataSource and dataSource [0].hasChildren true', () => {
      expect(componentInstance.fullDataSource$()[0].hasChildren).toBe(false);
      expect(componentInstance.dataSource$()[0].hasChildren).toBe(false);
    });
    it('should return fullDataSource and dataSource [0].level of 0', () => {
      expect(componentInstance.fullDataSource$()[0].level).toBe(0);
      expect(componentInstance.dataSource$()[0].level).toBe(0);
    });
  });
  describe('When applyRange() is called and only one element is in the array and the object has been resolved and node is expanded', () => {
    beforeEach(() => {
      expandedMap.set('1', 0, '1', true);
      componentInstance.location$ = signal({
        id: '1',
        name: 'location1',
        departments: new Proxy([] as Department[], {
          get(_, prop) {
            if (prop === 'getIdAtIndex') {
              return (__: number) => '1';
            }
            if (prop === 'length') {
              return 1;
            }
            return {
              id: '1',
              name: 'department1',
              children: new Proxy([] as Department[], {
                get(__, prop2) {
                  if (prop2 === 'getIdAtIndex') {
                    return (___: number) => '1';
                  }
                  if (prop2 === 'length') {
                    return 1;
                  }
                  return {
                    id: '1',
                    name: department1a,
                    hasChildren: false,
                    children: [],
                  };
                },
              }),
              hasChildren: true,
            };
          },
        }),
      }) as unknown as typeof componentInstance.location$;
      jest
        .spyOn(
          // isExpanded is a private method, we cast it here to make it public
          // so we can spy on it
          castTo<{
            isExpanded(node: { node: { id: string }; level: number }): boolean;
          }>(service),
          'isExpanded',
        )
        .mockImplementation((node) => {
          return !!(node.node.id === '1' && node.level === 0);
        });
      mockComponent.detectChanges();
      service.applyRange();
    });
    afterEach(() => {
      expandedMap.delete('1', 0, '1');
    });
    it('should return fullDataSource and dataSource length of 2', () => {
      expect(componentInstance.fullDataSource$().length).toBe(2);
      expect(componentInstance.dataSource$().length).toBe(2);
    });
    it('should return fullDataSource and dataSource [0].id of 1', () => {
      expect(componentInstance.fullDataSource$()[0].node.id).toBe('1');
      expect(componentInstance.dataSource$()[0].node.id).toBe('1');
      expect(componentInstance.fullDataSource$()[1].node.id).toBe('1');
      expect(componentInstance.dataSource$()[1].node.id).toBe('1');
    });
    it('should return fullDataSource and dataSource [0].name of "department1"', () => {
      expect(componentInstance.fullDataSource$()[0].name).toBe('department1');
      expect(componentInstance.dataSource$()[0].name).toBe('department1');
      expect(componentInstance.fullDataSource$()[1].name).toBe(department1a);
      expect(componentInstance.dataSource$()[1].name).toBe(department1a);
    });
    it('should return fullDataSource and dataSource [0].hasChildren true', () => {
      expect(componentInstance.fullDataSource$()[0].hasChildren).toBe(true);
      expect(componentInstance.dataSource$()[0].hasChildren).toBe(true);
      expect(componentInstance.fullDataSource$()[1].hasChildren).toBe(false);
      expect(componentInstance.dataSource$()[1].hasChildren).toBe(false);
    });
    it('should return fullDataSource and dataSource [0].level of 0', () => {
      expect(componentInstance.fullDataSource$()[0].level).toBe(0);
      expect(componentInstance.dataSource$()[0].level).toBe(0);
      expect(componentInstance.fullDataSource$()[1].level).toBe(1);
      expect(componentInstance.dataSource$()[1].level).toBe(1);
    });
  });
  describe('When applyRange() is called and there are no selected locations', () => {
    beforeEach(() => {
      componentInstance.location$ = signal(
        undefined,
      ) as unknown as typeof mockComponent.componentInstance.location$;
    });
    it('should leave component.fullDataSource unchanged', () => {
      service.applyRange();
      expect(componentInstance.fullDataSource$().length).toBe(0);
    });
  });
  describe('When applyRange() is called and range.start and range.end are both 0', () => {
    beforeEach(() => {
      componentInstance.location$ = signal({
        id: '1',
        name: 'location1',
        departments: new Proxy([] as Department[], {
          get(_, prop) {
            if (prop === 'rawArray') {
              return ['1'];
            }
            return {
              id: '1',
              name: 'department1',
              children: new Proxy([] as Department[], {
                get(__, prop2) {
                  if (prop2 === 'rawArray') {
                    return ['1'];
                  }
                  return {
                    id: '1',
                    name: department1a,
                    hasChildren: false,
                    children: [],
                  };
                },
              }),
              hasChildren: true,
            };
          },
        }),
      }) as unknown as typeof componentInstance.location$;
      componentInstance.range = { start: 0, end: -1 };
    });
    it('should leave component.fullDataSource unchanged', () => {
      service.applyRange();
      expect(componentInstance.fullDataSource$().length).toBe(0);
    });
  });
  describe('when addChild is called and the node is not expanded', () => {
    let toggleExpandSpy: jest.SpyInstance;
    beforeEach(() => {
      // setup a spy on toggleExpand
      toggleExpandSpy = jest
        .spyOn(service, 'toggleExpand')
        .mockImplementation(() => {
          return;
        });
    });
    describe('and we are not using the virtual children', () => {
      it('should expand the child row and call addToStore', () => {
        let childAddStoreCalled = false;
        const virtualChildAddStoreCalled = false;

        // call addChild
        const node: TreeNode = {
          parentId: '1',
          node: {
            id: '1',
            name: 'node1',
            children: {
              addToStore: () => {
                childAddStoreCalled = true;
              },
            } as unknown as CommonSourceNode[],
          },
          name: 'node1',
          level: 0,
          isExpanded: false,
          hasChildren: false,
        };
        service.addChild(
          {
            id: '1',
            name: 'new',
            children: [],
          },
          node,
        );
        expect(toggleExpandSpy).toHaveBeenCalledTimes(1);
        expect(childAddStoreCalled).toBe(true);
        expect(virtualChildAddStoreCalled).toBe(false);
      });
    });
    describe('and we are using the virtual children', () => {
      it('should expand the row and call addToStore on virtualChildren', () => {
        let virtualChildAddStoreCalled = false;

        // Create a mock node with virtual children
        const node: TreeNode = {
          parentId: '1',
          node: {
            id: '1',
            name: 'node1',
            children: {
              addToStore: () => {
                virtualChildAddStoreCalled = true;
              },
            } as unknown as CommonSourceNode[],
          },
          name: 'node1',
          level: 0,
          isExpanded: false,
          hasChildren: false,
        };

        // Call addChild
        service.addChild(
          {
            id: '2',
            name: 'new',
            children: [],
          },
          node,
        );

        // Check if toggleExpand was called
        expect(toggleExpandSpy).toHaveBeenCalledTimes(1);

        // Check if addToStore was called on virtualChildren
        expect(virtualChildAddStoreCalled).toBe(true);
      });
    });
  });
  describe('when addChild is called and the node is expanded', () => {
    let toggleExpandSpy: jest.SpyInstance;
    beforeEach(() => {
      // setup a spy on toggleExpand
      toggleExpandSpy = jest.spyOn(service, 'toggleExpand');
    });
    it('should expand the row', () => {
      // call addChild
      const node: TreeNode = {
        parentId: '1',
        node: {
          id: '1',
          name: 'node1',
          children: {
            addToStore: () => {
              /* noop */
            },
          } as unknown as CommonSourceNode[],
        },
        name: 'node1',
        level: 0,
        isExpanded: true,
        hasChildren: false,
      };
      service.addChild(
        {
          id: '1',
          name: 'new',
          children: [],
        },
        node,
      );
      expect(toggleExpandSpy).not.toHaveBeenCalled();
      // see if toggleExpand was called
    });
  });
  describe('when cancelEdit is called and we are adding a new node', () => {
    let removeChildSpy: jest.SpyInstance;
    beforeEach(() => {
      removeChildSpy = jest
        .spyOn(service, 'removeChild')
        .mockImplementation(() => {
          /* noop */
        });
    });
    it('should remove the node from the child array', () => {
      service.form = {
        addingParent: { name: 't' } as TreeNode,
        editingNode: '',
        addingNode: 't',
        editingContent: 't',
      } as TreeComponent;
      service.cancelEdit({
        name: 'new',
        node: { name: 'boo' },
      } as TreeNode);
      expect(removeChildSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('when cancelEdit is called and we are not adding a new node', () => {
    let removeChildSpy: jest.SpyInstance;
    beforeEach(() => {
      removeChildSpy = jest
        .spyOn(service, 'removeChild')
        .mockImplementation(() => {
          /* noop */
        });
    });
    it('should remove the node from the child array', () => {
      service.form = {
        addingParent: null,
        editingNode: 't',
        addingNode: '',
        editingContent: 't',
      } as TreeComponent;
      service.cancelEdit({
        name: 'new',
        node: { name: 'boo' },
      } as TreeNode);
      expect(removeChildSpy).not.toHaveBeenCalled();
    });
  });
  describe('transform method', () => {
    it('should return an empty array if children array is empty', () => {
      const result = service.transform({
        parentId: '1',
        children: new Proxy([] as CommonSourceNode[], {
          get(_, prop) {
            if (prop === 'length') {
              return 0;
            }
            return undefined;
          },
        }) as unknown as SmartArray<CommonSourceNode, CommonSourceNode>,
        level: 0,
        startRange: 0,
        endRange: 10,
      });
      expect(result).toEqual([]);
    });
    it('should return the correct result when endRange is -1', () => {
      const children = new Proxy(
        [
          {
            id: '1',
            name: 'node1',
            children: [],
          },
          {
            id: '2',
            name: 'node2',
            children: [],
          },
        ] as CommonSourceNode[],
        {
          get(target, prop) {
            if (prop === 'length') {
              return target.length;
            }
            return target[prop as keyof CommonSourceNode[]];
          },
        },
      ) as unknown as SmartArray<CommonSourceNode, CommonSourceNode>;

      const result = service.transform({
        parentId: '1',
        children,
        level: 0,
        startRange: 0,
        endRange: -1,
      });

      expect(result.length).toBe(2);
      expect(result[0]).toBeUndefined();
      expect(result[1]).toBeUndefined();
    });

    it('should return the correct result when index exceeds endRange', () => {
      const children = new Proxy(
        [
          {
            id: '1',
            name: 'node1',
            children: [],
          },
          {
            id: '2',
            name: 'node2',
            children: [],
          },
        ] as CommonSourceNode[],
        {
          get(target, prop) {
            if (prop === 'length') {
              return target.length;
            }
            if (prop === 'getIdAtIndex') {
              return (index: number) => '' + (index + 1);
            }
            return target[prop as keyof CommonSourceNode[]];
          },
        },
      ) as unknown as SmartArray<CommonSourceNode, CommonSourceNode>;

      const result = service.transform({
        parentId: '1',
        children,
        level: 0,
        startRange: 0,
        endRange: 0,
      });

      expect(result.length).toBe(2);
      expect(result[0].node.id).toBe('1');
      expect(result[1]).toBeUndefined();
    });
  });
  describe('transformTreeNode method', () => {
    let mockChildren: SmartArray<CommonSourceNode, CommonSourceNode>;
    let mockResult: TreeNode[];

    beforeEach(() => {
      mockChildren = new Proxy(
        {
          '1': {
            id: '1',
            name: 'Node 1',
            children: [],
          },
          '2': {
            id: '2',
            name: 'Node 2',
            children: [],
          },
        },
        {
          get(target, prop) {
            if (prop === 'length') {
              return Object.keys(target).length;
            }
            if (prop === 'getIdAtIndex') {
              return (index: number) => Object.keys(target)[index];
            }
            const index = parseInt(prop as string, 10);
            if (!isNaN(index)) {
              return target[Object.keys(target)[index] as keyof typeof target];
            }
            return target[prop as keyof typeof target];
          },
        },
      ) as unknown as SmartArray<CommonSourceNode, CommonSourceNode>;
      mockResult = [];
      jest.spyOn(expandedMap, 'get').mockReturnValue(false);
    });

    it('should add node when startRange <= result.length <= endRange', () => {
      service.transformTreeNode({
        parentId: '0',
        children: mockChildren,
        result: mockResult,
        index: 0,
        level: 0,
        startRange: 0,
        endRange: 1,
      });

      expect(mockResult.length).toBe(1);
      expect(mockResult[0].node.id).toBe('1');
    });

    it('should add node when isExpanded is true', () => {
      jest.spyOn(expandedMap, 'get').mockReturnValue(true);

      service.transformTreeNode({
        parentId: '0',
        children: mockChildren,
        result: mockResult,
        index: 0,
        level: 0,
        startRange: 2,
        endRange: 3,
      });

      expect(mockResult.length).toBe(1);
      expect(mockResult[0].node.id).toBe('1');
    });

    it('should only increment result length when condition is not met', () => {
      service.transformTreeNode({
        parentId: '0',
        children: mockChildren,
        result: mockResult,
        index: 0,
        level: 0,
        startRange: 2,
        endRange: 3,
      });

      expect(mockResult.length).toBe(1);
      expect(mockResult[0]).toBeUndefined();
    });

    it('should recursively transform child nodes when node is expanded', () => {
      jest.spyOn(expandedMap, 'get').mockReturnValue(true);
      const mockChildrenWithNestedChildren = new Proxy(
        {
          '1': {
            id: '1',
            name: 'Node 1',
            children: new Proxy(
              {
                '1-1': {
                  id: '1-1',
                  name: 'Child 1',
                  children: [],
                },
              },
              {
                get(target, prop) {
                  if (prop === 'length') {
                    return Object.keys(target).length;
                  }
                  if (prop === 'getIdAtIndex') {
                    return (index: number) => Object.keys(target)[index];
                  }
                  const index = parseInt(prop as string, 10);
                  if (!isNaN(index)) {
                    return target[
                      Object.keys(target)[index] as keyof typeof target
                    ];
                  }
                  return target[prop as keyof typeof target];
                },
              },
            ) as unknown as SmartArray<CommonSourceNode, CommonSourceNode>,
          },
        },
        {
          get(target, prop) {
            if (prop === 'length') {
              return Object.keys(target).length;
            }
            if (prop === 'getIdAtIndex') {
              return (index: number) => Object.keys(target)[index];
            }
            const index = parseInt(prop as string, 10);
            if (!isNaN(index)) {
              return target[Object.keys(target)[index] as keyof typeof target];
            }
            return target[prop as keyof typeof target];
          },
        },
      ) as unknown as SmartArray<CommonSourceNode, CommonSourceNode>;

      service.transformTreeNode({
        parentId: '0',
        children: mockChildrenWithNestedChildren,
        result: mockResult,
        index: 0,
        level: 0,
        startRange: 0,
        endRange: 2,
      });

      expect(mockResult.length).toBe(2);
      expect(mockResult[0].node.id).toBe('1');
      expect(mockResult[1].node.id).toBe('1-1');
    });
  });
  describe('isNodeAtPosition', () => {
    it('should return true when node is at the correct position', () => {
      const node: TreeNode = {
        node: { id: '1', name: '', children: [] },
        level: 2,
        parentId: '1',
        name: childNodeName,
        hasChildren: false,
        isExpanded: false,
      };
      const parent: TreeNode = {
        node: { id: '1', name: '', children: [] },
        level: 1,
        parentId: '1',
        name: parentNodeName,
        hasChildren: true,
        isExpanded: true,
      };

      const result = TreeComponentService.isNodeAtPosition(node, parent);
      expect(result).toBe(true);
    });

    it('should return false when node id does not match parent id', () => {
      const node: TreeNode = {
        node: { id: '3', name: '', children: [] },
        level: 2,
        parentId: '1',
        name: childNodeName,
        hasChildren: false,
        isExpanded: false,
      };
      const parent: TreeNode = {
        node: { id: '2', name: '', children: [] },
        level: 1,
        parentId: '0',
        name: parentNodeName,
        hasChildren: true,
        isExpanded: true,
      };

      const result = TreeComponentService.isNodeAtPosition(node, parent);
      expect(result).toBe(false);
    });

    it('should return false when node level is not one more than parent level', () => {
      const node: TreeNode = {
        node: { id: '2', name: '', children: [] },
        level: 3,
        parentId: '1',
        name: childNodeName,
        hasChildren: false,
        isExpanded: false,
      };
      const parent: TreeNode = {
        node: { id: '2', name: '', children: [] },
        level: 1,
        parentId: '0',
        name: parentNodeName,
        hasChildren: true,
        isExpanded: true,
      };

      const result = TreeComponentService.isNodeAtPosition(node, parent);
      expect(result).toBe(false);
    });

    it('should return false when node is undefined', () => {
      const node: TreeNode | undefined = undefined;
      const parent: TreeNode = {
        node: { id: '2', name: '', children: [] },
        level: 1,
        parentId: '0',
        name: parentNodeName,
        hasChildren: true,
        isExpanded: true,
      };

      const result = TreeComponentService.isNodeAtPosition(node, parent);
      expect(result).toBe(false);
    });
  });
});
