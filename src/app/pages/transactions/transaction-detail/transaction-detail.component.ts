import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
  trasactionsData: any;
  constructor(
    private dialogRef: MatDialogRef<TransactionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.trasactionsData = data.trasactionsData;
   }
  
  ngOnInit(): void {
    // console.log(this.trasactionsData,'model')
  }
  
  

  popupClose(){
    this.dialogRef.close();
  }

}
