import { TestBed } from '@angular/core/testing';

import { castTo } from '@smart/smart-ngrx/common/cast-to.function';

import { Department } from '../../department/department.interface';
import { CommonSourceNode } from './common-source-node.interface';
import { TreeComponent } from './tree.component';
import { TreeComponentService } from './tree-component.service';
import { TreeNode } from './tree-node.interface';

const department1a = 'department1-a';

describe('TreeComponentService', () => {
  let service: TreeComponentService;
  let mockComponent: TreeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeComponentService],
    });
    service = TestBed.inject(TreeComponentService);

    // Mock TreeComponent
    mockComponent = {
      location: null,
      range: { start: 0, end: 6 },
      fullDataSource: [],
      dataSource: [],
    } as unknown as TreeComponent;

    service.form = mockComponent;
  });
  describe('When toggleExpand() is called', () => {
    it('should toggle node expansion on and off', () => {
      const node: TreeNode = {
        node: { id: '1', name: 'node1', children: [] },
        name: 'node1',
        level: 0,
        isExpanded: false,
        hasChildren: false,
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
      mockComponent.location = {
        id: '1',
        name: 'location1',
        departments: new Proxy([] as Department[], {
          get(target, prop) {
            if (prop === 'rawArray') {
              return ['1'];
            }
            return '1';
          },
        }),
      };
      service.applyRange();
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource length of 1', () => {
      expect(mockComponent.fullDataSource.length).toBe(1);
      expect(mockComponent.dataSource.length).toBe(1);
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource [0].id of 1', () => {
      expect(mockComponent.fullDataSource[0].node.id).toBe('1');
      expect(mockComponent.dataSource[0].node.id).toBe('1');
    });
    it('should return fullDataSource and dataSource [0].name of ""', () => {
      expect(mockComponent.fullDataSource[0].name).toBe('');
      expect(mockComponent.dataSource[0].name).toBe('');
    });
    it('should return fullDataSource and dataSource [0].hasChildren false', () => {
      expect(mockComponent.fullDataSource[0].hasChildren).toBe(false);
      expect(mockComponent.dataSource[0].hasChildren).toBe(false);
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource [0].level of 0', () => {
      expect(mockComponent.fullDataSource[0].level).toBe(0);
      expect(mockComponent.dataSource[0].level).toBe(0);
    });
  });
  describe('When applyRange() is called and only one element is in the array and the object has been resolved', () => {
    beforeEach(() => {
      mockComponent.location = {
        id: '1',
        name: 'location1',
        departments: new Proxy([] as Department[], {
          get(target, prop) {
            if (prop === 'rawArray') {
              return ['1'];
            }
            return {
              id: '1',
              name: 'department1',
              children: ['1'],
              hasChildren: true,
            };
          },
        }),
      };
      service.applyRange();
    });
    it('should return fullDataSource and dataSource length of 1', () => {
      expect(mockComponent.fullDataSource.length).toBe(1);
      expect(mockComponent.dataSource.length).toBe(1);
    });
    it('should return fullDataSource and dataSource [0].id of 1', () => {
      expect(mockComponent.fullDataSource[0].node.id).toBe('1');
      expect(mockComponent.dataSource[0].node.id).toBe('1');
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource [0].name of "department1"', () => {
      expect(mockComponent.fullDataSource[0].name).toBe('department1');
      expect(mockComponent.dataSource[0].name).toBe('department1');
    });
    // eslint-disable-next-line sonarjs/no-duplicate-string -- its a test same result different condition
    it('should return fullDataSource and dataSource [0].hasChildren true', () => {
      expect(mockComponent.fullDataSource[0].hasChildren).toBe(true);
      expect(mockComponent.dataSource[0].hasChildren).toBe(true);
    });
    it('should return fullDataSource and dataSource [0].level of 0', () => {
      expect(mockComponent.fullDataSource[0].level).toBe(0);
      expect(mockComponent.dataSource[0].level).toBe(0);
    });
  });
  describe('When applyRange() is called and only one element is in the array and the object has been resolved but no children array supplied', () => {
    beforeEach(() => {
      mockComponent.location = {
        id: '1',
        name: 'location1',
        departments: new Proxy([] as Department[], {
          get(target, prop) {
            if (prop === 'rawArray') {
              return ['1'];
            }
            return {
              id: '1',
              name: 'department1',
              hasChildren: true,
            };
          },
        }),
      };
      service.applyRange();
    });
    it('should return fullDataSource and dataSource length of 1', () => {
      expect(mockComponent.fullDataSource.length).toBe(1);
      expect(mockComponent.dataSource.length).toBe(1);
    });
    it('should return fullDataSource and dataSource [0].id of 1', () => {
      expect(mockComponent.fullDataSource[0].node.id).toBe('1');
      expect(mockComponent.dataSource[0].node.id).toBe('1');
    });
    it('should return fullDataSource and dataSource [0].name of "department1"', () => {
      expect(mockComponent.fullDataSource[0].name).toBe('department1');
      expect(mockComponent.dataSource[0].name).toBe('department1');
    });
    it('should return fullDataSource and dataSource [0].hasChildren true', () => {
      expect(mockComponent.fullDataSource[0].hasChildren).toBe(false);
      expect(mockComponent.dataSource[0].hasChildren).toBe(false);
    });
    it('should return fullDataSource and dataSource [0].level of 0', () => {
      expect(mockComponent.fullDataSource[0].level).toBe(0);
      expect(mockComponent.dataSource[0].level).toBe(0);
    });
  });
  describe('When applyRange() is called and only one element is in the array and the object has been resolved and node is expanded', () => {
    beforeEach(() => {
      mockComponent.location = {
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
      };
      jest
        .spyOn(
          castTo<{
            isExpanded(node: { node: { id: string }; level: number }): boolean;
          }>(service),
          'isExpanded',
        )
        .mockImplementation((node) => {
          return !!(node.node.id === '1' && node.level === 0);
        });
      service.applyRange();
    });
    it('should return fullDataSource and dataSource length of 2', () => {
      expect(mockComponent.fullDataSource.length).toBe(2);
      expect(mockComponent.dataSource.length).toBe(2);
    });
    it('should return fullDataSource and dataSource [0].id of 1', () => {
      expect(mockComponent.fullDataSource[0].node.id).toBe('1');
      expect(mockComponent.dataSource[0].node.id).toBe('1');
      expect(mockComponent.fullDataSource[1].node.id).toBe('1');
      expect(mockComponent.dataSource[1].node.id).toBe('1');
    });
    it('should return fullDataSource and dataSource [0].name of "department1"', () => {
      expect(mockComponent.fullDataSource[0].name).toBe('department1');
      expect(mockComponent.dataSource[0].name).toBe('department1');
      expect(mockComponent.fullDataSource[1].name).toBe(department1a);
      expect(mockComponent.dataSource[1].name).toBe(department1a);
    });
    it('should return fullDataSource and dataSource [0].hasChildren true', () => {
      expect(mockComponent.fullDataSource[0].hasChildren).toBe(true);
      expect(mockComponent.dataSource[0].hasChildren).toBe(true);
      expect(mockComponent.fullDataSource[1].hasChildren).toBe(false);
      expect(mockComponent.dataSource[1].hasChildren).toBe(false);
    });
    it('should return fullDataSource and dataSource [0].level of 0', () => {
      expect(mockComponent.fullDataSource[0].level).toBe(0);
      expect(mockComponent.dataSource[0].level).toBe(0);
      expect(mockComponent.fullDataSource[1].level).toBe(1);
      expect(mockComponent.dataSource[1].level).toBe(1);
    });
  });
  describe('when addChild is called and the node is not expanded', () => {
    let toggleExpandSpy: jest.SpyInstance;
    beforeEach(() => {
      // setup a spy on toggleExpand
      toggleExpandSpy = jest.spyOn(service, 'toggleExpand');
    });
    it('should expand the row', () => {
      // call addChild
      const node: TreeNode = {
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
        isExpanded: false,
        hasChildren: false,
      };
      service.addChild({ id: '1', name: 'new', children: [] }, node);
      expect(toggleExpandSpy).toHaveBeenCalledTimes(1);
      // see if toggleExpand was called
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
      service.addChild({ id: '1', name: 'new', children: [] }, node);
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
      service.cancelEdit({ name: 'new', node: { name: 'boo' } } as TreeNode);
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
      service.form = { addingParent: null } as TreeComponent;
      service.cancelEdit({ name: 'new', node: { name: 'boo' } } as TreeNode);
      expect(removeChildSpy).not.toHaveBeenCalled();
    });
  });
});
