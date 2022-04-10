import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyServiceComponent } from './verify-service.component';

describe('VerifyServiceComponent', () => {
  let component: VerifyServiceComponent;
  let fixture: ComponentFixture<VerifyServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
