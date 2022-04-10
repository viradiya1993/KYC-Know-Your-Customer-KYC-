import { TestBed, async } from '@angular/core/testing';
import { ForgetPasswordComponent } from './forget-password.component';

describe('ForgetPasswordComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetPasswordComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ForgetPasswordComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
