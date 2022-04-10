import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkVerificationComponent } from './bulk-verification.component';

describe('BulkVerificationComponent', () => {
  let component: BulkVerificationComponent;
  let fixture: ComponentFixture<BulkVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
