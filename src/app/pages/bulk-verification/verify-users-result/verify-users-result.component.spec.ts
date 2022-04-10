import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUsersResultComponent } from './verify-users-result.component';

describe('VerifyUsersResultComponent', () => {
  let component: VerifyUsersResultComponent;
  let fixture: ComponentFixture<VerifyUsersResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyUsersResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyUsersResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
