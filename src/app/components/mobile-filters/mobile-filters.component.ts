import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-filters',
  templateUrl: './mobile-filters.component.html',
  styleUrls: ['./mobile-filters.component.scss']
})
export class MobileFiltersComponent implements OnInit {
  @Output() TransactionFilterEvent: EventEmitter<any> = new EventEmitter();
  searchValue: any = '';
  transactionFilter: any = {};
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

   /* Trasaction Filter chnage  */
   transactionFilterChange(): void {
    this.cdr.detectChanges();
    this.TransactionFilterEvent.emit(this.transactionFilter);
  }

  
}
