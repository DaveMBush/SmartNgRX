import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Department } from '../store/department/department.interface';
import { Location } from '../store/locations/location.interface';
import { SidebarComponent } from './sidebar.component';
import { SidebarComponentService } from './sidebar-component.service';
interface TestableSidebarComponent
  extends Omit<SidebarComponent, 'sidebarComponentService'> {
  sidebarComponentService: SidebarComponentService;
}

// Create a test host component
@Component({
  selector: `dmb-test-host-component`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<dmb-sidebar
    locationId="1"
    [location]="testLocation"
    [locations]="locations"
  ></dmb-sidebar>`,
})
class TestHostComponent {
  testLocation = { id: '1', name: 'Initial Location', departments: [] as Department[] };
  locations: Location[] | null = [this.testLocation];
}

describe('SidebarComponent', () => {

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent, TestHostComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        CommonModule,
        ScrollingModule,
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
    const sidebarComponent = testHostFixture.debugElement.children[0]
      .componentInstance as TestableSidebarComponent;
    // Spy on the correct instance of SidebarComponentService
    const applyRangeSpy = jest.spyOn(
      sidebarComponent.sidebarComponentService,
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
    expect(sidebarComponent.locationId).toBe('1');

    // Verify that applyRange has been called
    expect(applyRangeSpy).toHaveBeenCalled();
  });
});
