import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkDetailComponent } from './bulk-detail.component';

describe('BulkDetailComponent', () => {
  let component: BulkDetailComponent;
  let fixture: ComponentFixture<BulkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
