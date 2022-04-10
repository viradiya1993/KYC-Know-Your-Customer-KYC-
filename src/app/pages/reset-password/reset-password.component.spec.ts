import { TestBed, async } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ResetPasswordComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
