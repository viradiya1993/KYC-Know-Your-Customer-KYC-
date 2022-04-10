import { TestBed, async } from '@angular/core/testing';
import { UserManagementComponent } from './user-management.component';

describe('UserManagementComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserManagementComponent],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UserManagementComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
