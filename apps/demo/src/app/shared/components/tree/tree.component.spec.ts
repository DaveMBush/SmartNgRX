import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, InputSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Department } from '../../department/department.interface';
import { Location } from '../../locations/location.interface';
import { TreeComponent } from './tree.component';
import { TreeComponentService } from './tree-component.service';
import { TreeNode } from './tree-node.interface';
interface TestableTreeComponent
  // we omit treeComponentService from the original component
  // because it is private and we need it available as public
  extends Omit<TreeComponent, 'treeComponentService'> {
  treeComponentService: TreeComponentService;
  locationId$: InputSignal<number | string | null>;
  locations$: InputSignal<Location[] | null>;
}

// Create a test host component
@Component({
  selector: `dmb-test-host-component`,
  imports: [TreeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<dmb-tree
    locationId="1"
    [location]="testLocation"
    [locations]="locations"
  ></dmb-tree>`,
})
class TestHostComponent {
  testLocation = {
    id: '1',
    name: 'Initial Location',
    departments: [] as Department[],
  };

  locations: Location[] | null = [this.testLocation];
}

describe('TreeComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
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
    }).compileComponents();

    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should handle ngOnChanges when location changes', () => {
    const treeComponent = testHostFixture.debugElement.children[0]
      .componentInstance as TestableTreeComponent;
    // Spy on the correct instance of TreeComponentService
    const applyRangeSpy = jest.spyOn(
      treeComponent.treeComponentService,
      'applyRange',
    );

    // Change the location input and trigger change detection
    testHostComponent.testLocation = {
      id: '1',
      name: 'New Location',
      departments: [],
    };
    testHostFixture.detectChanges();

    // Verify that locationName is updated
    expect(treeComponent.locationId$()).toBe('1');

    // Verify that applyRange has been called
    expect(applyRangeSpy).toHaveBeenCalled();
  });
  it('should call applyRange only when location input changes', () => {
    const treeComponent = testHostFixture.debugElement.children[0]
      .componentInstance as TestableTreeComponent;
    const applyRangeSpy = jest.spyOn(
      treeComponent.treeComponentService,
      'applyRange',
    );

    // Change the location input and trigger change detection
    testHostComponent.testLocation = {
      id: '2',
      name: 'New Location',
      departments: [],
    };
    testHostFixture.detectChanges();

    // Verify that applyRange has been called
    expect(applyRangeSpy).toHaveBeenCalledTimes(1);

    // Reset the spy
    applyRangeSpy.mockClear();

    // Change other inputs through the host component
    testHostComponent.locations = [
      { id: '3', name: 'Another Location', departments: [] },
    ];
    testHostFixture.detectChanges();

    // Verify that applyRange has not been called
    expect(applyRangeSpy).not.toHaveBeenCalled();
  });
  it('should not save node when waitForScroll is true', () => {
    const treeComponent = testHostFixture.debugElement.children[0]
      .componentInstance as TestableTreeComponent;

    // Set up the component state
    treeComponent.waitForScroll = true;
    treeComponent.editingNode = '1:123';
    treeComponent.editingContent = 'Edited Content';
    treeComponent.addingParent = {} as TreeNode;

    // Create a mock node
    const mockNode = {
      level: 1,
      parentId: '1',
      node: { id: '123', name: 'Original Name3', children: [] },
      name: 'Original Name',
      hasChildren: false,
    } as TreeNode;

    // Call saveNode
    treeComponent.saveNode(mockNode);

    // Assert that the state hasn't changed
    expect(treeComponent.editingNode).toBe('1:123');
    expect(treeComponent.editingContent).toBe('Edited Content');
    expect(treeComponent.addingParent).not.toBeNull();
    expect(mockNode.node.name).toBe('Original Name3');
  });
});
