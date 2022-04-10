import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVerifyNotificationPopupComponent } from './client-verify-notification-popup.component';

describe('ClientVerifyNotificationPopupComponent', () => {
  let component: ClientVerifyNotificationPopupComponent;
  let fixture: ComponentFixture<ClientVerifyNotificationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientVerifyNotificationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientVerifyNotificationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
