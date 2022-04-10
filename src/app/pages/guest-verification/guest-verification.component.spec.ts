import { TestBed, async } from '@angular/core/testing';
import { GuestVerificationComponent } from './guest-verification.component';

describe('GuestVerificationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GuestVerificationComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GuestVerificationComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
