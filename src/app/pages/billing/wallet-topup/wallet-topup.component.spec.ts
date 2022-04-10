import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletTopupComponent } from './wallet-topup.component'

describe('TransactionComponent', () => {
  let component: WalletTopupComponent;
  let fixture: ComponentFixture<WalletTopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletTopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletTopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
