import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOnboardingComponent } from './dashboard-onboarding.component';

describe('DashboardOnboardingComponent', () => {
  let component: DashboardOnboardingComponent;
  let fixture: ComponentFixture<DashboardOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
