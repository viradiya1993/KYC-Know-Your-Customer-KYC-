import { TestBed, async } from '@angular/core/testing';
import { ReseOnLoginComponent } from './reset-on-login.component';

describe('ReseOnLoginComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReseOnLoginComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ReseOnLoginComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
