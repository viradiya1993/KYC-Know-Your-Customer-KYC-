import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsResultComponent } from './transactions-result.component';

describe('TransactionsResultComponent', () => {
  let component: TransactionsResultComponent;
  let fixture: ComponentFixture<TransactionsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
