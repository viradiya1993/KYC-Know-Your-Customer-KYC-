import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkVericationRecordComponent } from './bulk-verication-record.component';

describe('BulkVericationRecordComponent', () => {
  let component: BulkVericationRecordComponent;
  let fixture: ComponentFixture<BulkVericationRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkVericationRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkVericationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
