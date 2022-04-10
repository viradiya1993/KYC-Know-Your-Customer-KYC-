import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkVericationDashboardComponent } from './bulk-verication-dashboard.component';

describe('BulkVericationDashboardComponent', () => {
  let component: BulkVericationDashboardComponent;
  let fixture: ComponentFixture<BulkVericationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkVericationDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkVericationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
