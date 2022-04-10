import { TestBed, async } from '@angular/core/testing';
import { ResetLinkComponent } from './reset-link.component';

describe('ResetLinkComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetLinkComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ResetLinkComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
