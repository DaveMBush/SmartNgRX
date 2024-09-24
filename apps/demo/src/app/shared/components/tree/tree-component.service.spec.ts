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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { castTo } from '@smarttools/smart-ngrx';

import { Department } from '../../department/department.interface';
import { CommonSourceNode } from './common-source-node.interface';
import { expandedMap } from './expanded-map.class';
import { TreeComponent } from './tree.component';
import { TreeComponentService } from './tree-component.service';
import { TreeNode } from './tree-node.interface';

const department1a = 'department1-a';

describe('TreeComponentService', () => {
  // redefine service because virtualArrayFlagService is private
  let service: Omit<TreeComponentService, 'virtualArrayFlagService'> & {
    virtualArrayFlagService: { virtualArrayFlag: boolean };
  };
  let mockComponent: ComponentFixture<TreeComponent>;
  let componentInstance: TreeComponent;
  let fixture: TestBed;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TreeComponent],
      imports: [
        NoopAnimationsModule,
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
    mockComponent.componentInstance.locationId = signal(
      '1',
    ) as unknown as typeof mockComponent.componentInstance.locationId;
    mockComponent.componentInstance.location = signal(
      null,
    ) as unknown as typeof mockComponent.componentInstance.location;
    mockComponent.componentInstance.locations = signal(
      [],
    ) as unknown as typeof mockComponent.componentInstance.locations;
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
          virtualChildren: { length: 0 },
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
      componentInstance.location = signal({
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
      }) as unknown as typeof componentInstance.location;
      mockComponent.detectChanges();
      service.applyRange();
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource length of 1', () => {
      expect(componentInstance.fullDataSource.length).toBe(1);
      expect(componentInstance.dataSource.length).toBe(1);
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource [0].id of 1', () => {
      expect(componentInstance.fullDataSource[0].node.id).toBe('1');
      expect(componentInstance.dataSource[0].node.id).toBe('1');
    });
    it('should return fullDataSource and dataSource [0].name of ""', () => {
      expect(componentInstance.fullDataSource[0].name).toBe('');
      expect(componentInstance.dataSource[0].name).toBe('');
    });
    it('should return fullDataSource and dataSource [0].hasChildren false', () => {
      expect(componentInstance.fullDataSource[0].hasChildren).toBe(false);
      expect(componentInstance.dataSource[0].hasChildren).toBe(false);
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource [0].level of 0', () => {
      expect(componentInstance.fullDataSource[0].level).toBe(0);
      expect(componentInstance.dataSource[0].level).toBe(0);
    });
  });
  describe('When applyRange() is called and only one element is in the array and the object has been resolved', () => {
    beforeEach(() => {
      componentInstance.location = signal({
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
      }) as unknown as typeof componentInstance.location;
      mockComponent.detectChanges();
      service.applyRange();
    });
    it('should return fullDataSource and dataSource length of 1', () => {
      expect(componentInstance.fullDataSource.length).toBe(1);
      expect(componentInstance.dataSource.length).toBe(1);
    });
    it('should return fullDataSource and dataSource [0].id of 1', () => {
      expect(componentInstance.fullDataSource[0].node.id).toBe('1');
      expect(componentInstance.dataSource[0].node.id).toBe('1');
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource [0].name of "department1"', () => {
      expect(componentInstance.fullDataSource[0].name).toBe('department1');
      expect(componentInstance.dataSource[0].name).toBe('department1');
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource [0].hasChildren true', () => {
      expect(componentInstance.fullDataSource[0].hasChildren).toBe(true);
      expect(componentInstance.dataSource[0].hasChildren).toBe(true);
    });
    it('should return fullDataSource and dataSource [0].level of 0', () => {
      expect(componentInstance.fullDataSource[0].level).toBe(0);
      expect(componentInstance.dataSource[0].level).toBe(0);
    });
  });
  describe('When applyRange() is called and only one element is in the array and the object has been resolved but no children array supplied', () => {
    beforeEach(() => {
      componentInstance.location = signal({
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
      }) as unknown as typeof componentInstance.location;
      mockComponent.detectChanges();
      service.applyRange();
    });
    it('should return fullDataSource and dataSource length of 1', () => {
      expect(componentInstance.fullDataSource.length).toBe(1);
      expect(componentInstance.dataSource.length).toBe(1);
    });
    it('should return fullDataSource and dataSource [0].id of 1', () => {
      expect(componentInstance.fullDataSource[0].node.id).toBe('1');
      expect(componentInstance.dataSource[0].node.id).toBe('1');
    });
    it('should return fullDataSource and dataSource [0].name of "department1"', () => {
      expect(componentInstance.fullDataSource[0].name).toBe('department1');
      expect(componentInstance.dataSource[0].name).toBe('department1');
    });
    it('should return fullDataSource and dataSource [0].hasChildren true', () => {
      expect(componentInstance.fullDataSource[0].hasChildren).toBe(false);
      expect(componentInstance.dataSource[0].hasChildren).toBe(false);
    });
    it('should return fullDataSource and dataSource [0].level of 0', () => {
      expect(componentInstance.fullDataSource[0].level).toBe(0);
      expect(componentInstance.dataSource[0].level).toBe(0);
    });
  });
  describe('When applyRange() is called and only one element is in the array and the object has been resolved and node is expanded', () => {
    beforeEach(() => {
      expandedMap.set('1', 0, '1', true);
      componentInstance.location = signal({
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
      }) as unknown as typeof componentInstance.location;
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
      expect(componentInstance.fullDataSource.length).toBe(2);
      expect(componentInstance.dataSource.length).toBe(2);
    });
    it('should return fullDataSource and dataSource [0].id of 1', () => {
      expect(componentInstance.fullDataSource[0].node.id).toBe('1');
      expect(componentInstance.dataSource[0].node.id).toBe('1');
      expect(componentInstance.fullDataSource[1].node.id).toBe('1');
      expect(componentInstance.dataSource[1].node.id).toBe('1');
    });
    it('should return fullDataSource and dataSource [0].name of "department1"', () => {
      expect(componentInstance.fullDataSource[0].name).toBe('department1');
      expect(componentInstance.dataSource[0].name).toBe('department1');
      expect(componentInstance.fullDataSource[1].name).toBe(department1a);
      expect(componentInstance.dataSource[1].name).toBe(department1a);
    });
    it('should return fullDataSource and dataSource [0].hasChildren true', () => {
      expect(componentInstance.fullDataSource[0].hasChildren).toBe(true);
      expect(componentInstance.dataSource[0].hasChildren).toBe(true);
      expect(componentInstance.fullDataSource[1].hasChildren).toBe(false);
      expect(componentInstance.dataSource[1].hasChildren).toBe(false);
    });
    it('should return fullDataSource and dataSource [0].level of 0', () => {
      expect(componentInstance.fullDataSource[0].level).toBe(0);
      expect(componentInstance.dataSource[0].level).toBe(0);
      expect(componentInstance.fullDataSource[1].level).toBe(1);
      expect(componentInstance.dataSource[1].level).toBe(1);
    });
  });
  describe('When applyRange() is called and there are no selected locations', () => {
    beforeEach(() => {
      componentInstance.location = signal(
        undefined,
      ) as unknown as typeof mockComponent.componentInstance.location;
    });
    it('should leave component.fullDataSource unchanged', () => {
      service.applyRange();
      expect(componentInstance.fullDataSource).toEqual([]);
    });
  });
  describe('When applyRange() is called and range.start and range.end are both 0', () => {
    beforeEach(() => {
      componentInstance.location = signal({
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
      }) as unknown as typeof componentInstance.location;
      componentInstance.range = { start: 0, end: -1 };
    });
    it('should leave component.fullDataSource unchanged', () => {
      service.applyRange();
      expect(componentInstance.fullDataSource).toEqual([]);
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
        let virtualChildAddStoreCalled = false;

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
            virtualChildren: { length: 0 },
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
            virtualChildren: {
              length: 0,
              addToStore: () => {
                virtualChildAddStoreCalled = true;
              },
            },
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
        service.virtualArrayFlagService.virtualArrayFlag = true;
        let childAddStoreCalled = false;

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
            virtualChildren: {
              length: 0,
              addToStore: () => {
                virtualChildAddStoreCalled = true;
              },
            },
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
            virtualChildren: { length: 0 },
          },
          node,
        );
        expect(toggleExpandSpy).toHaveBeenCalledTimes(1);
        expect(virtualChildAddStoreCalled).toBe(true);
        expect(childAddStoreCalled).toBe(false);
        // see if toggleExpand was called
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
          virtualChildren: { length: 0 },
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
          virtualChildren: { length: 0 },
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
      } as TreeComponent;
      service.cancelEdit({
        name: 'new',
        node: { name: 'boo' },
      } as TreeNode);
      expect(removeChildSpy).not.toHaveBeenCalled();
    });
  });
});
