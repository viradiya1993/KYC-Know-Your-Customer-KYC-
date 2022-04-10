import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transactions-result',
  templateUrl: './transactions-result.component.html',
  styleUrls: ['./transactions-result.component.scss']
})
export class TransactionsResultComponent implements OnInit {
  transactionResult: any;
  whichWrapperResponse: string;
  responseCardJSON: any;
  constructor(
    public dialogRef: MatDialogRef<TransactionsResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.transactionResult = data.transactionResult;
    this.transactionResult['keyfrom'] = 'trasactions';
  }

  ngOnInit(): void {
    
  }

  closerevent() {
    this.dialogRef.close();
  }
}
