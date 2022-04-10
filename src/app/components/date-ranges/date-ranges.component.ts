import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { AppConst } from 'src/app/app.constant';

@Component({
  selector: 'app-date-ranges',
  templateUrl: './date-ranges.component.html',
  styleUrls: ['./date-ranges.component.scss']
})
export class DateRangesComponent implements OnInit {
  @Output() TransactionFilterEvent: EventEmitter<any> = new EventEmitter();
  transactionFilter: any = {};
  limit: any = AppConst.pageSize;
  filterTransaction: any = { paymentStatus: '', verificationStatus: '', transactionType: '', fromDate: null,  toDate: null, search: '', serviceName: '', pageSizeLimit: this.limit};
  selected = {start: '', end: ''}
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  }
  constructor() { }

  ngOnInit(): void {
  }

  onDateChange(event) {
    var sDate = moment(this.selected.start);
    var eDate = moment(this.selected.end);
    if(sDate.isValid() && eDate.isValid()) {
      var startDate = moment(this.selected.start).format("YYYY-MM-DD")
      var endDate = moment(this.selected.end).format("YYYY-MM-DD")
      this.transactionFilter.from = startDate;
      this.transactionFilter.to = endDate;
      this.TransactionFilterEvent.emit(this.transactionFilter);   
    }
  }
}
