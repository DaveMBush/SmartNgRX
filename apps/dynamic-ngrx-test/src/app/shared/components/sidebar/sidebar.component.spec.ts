import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTreeModule } from '@angular/material/tree';

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
  template: `<dmb-sidebar [location]="testLocation"></dmb-sidebar>`,
})
class TestHostComponent {
  testLocation = { name: 'Initial Location' };
}

describe('SidebarComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent, TestHostComponent],
      imports: [ScrollingModule, MatTreeModule],
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
      'applyRange'
    );

    // Change the location input and trigger change detection
    testHostComponent.testLocation = { name: 'New Location' };
    testHostFixture.detectChanges();

    // Verify that locationName is updated
    expect(sidebarComponent.locationName).toBe('New Location');

    // Verify that applyRange has been called
    expect(applyRangeSpy).toHaveBeenCalled();
  });
});
