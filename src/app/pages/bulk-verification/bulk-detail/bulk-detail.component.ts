import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bulk-detail',
  templateUrl: './bulk-detail.component.html',
  styleUrls: ['./bulk-detail.component.scss']
})
export class BulkDetailComponent implements OnInit {
  allBulkRecord:any;
  constructor(
    private dialogRef: MatDialogRef<BulkDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { this.allBulkRecord = data.bulkData }

  ngOnInit(): void {
   
  }

  popupClose(){
    this.dialogRef.close();
  }

}
