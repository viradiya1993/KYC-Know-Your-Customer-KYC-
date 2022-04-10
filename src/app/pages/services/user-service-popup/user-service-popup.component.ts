import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-service-popup',
  templateUrl: './user-service-popup.component.html',
  styleUrls: ['./user-service-popup.component.scss']
})
export class UserServicePopupComponent implements OnInit {
  service: any = {};
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<UserServicePopupComponent>) {
    this.service = data.wrapperService;
  }
  @ViewChild('formPreview', { static: false }) formPreview: any;
  previewValue = {};
  formJSON: any
  configJSON: any;

  ngOnInit(): void {
    const organisationName = JSON.parse(window.localStorage.getItem("current-category"))
    this.previewValue = {
      companyName: organisationName.name
    }
    this.formJSON = this.service.wrapperDetails.form_json;
    // this.configJSON = JSON.parse(this.formJSON.config);
    this.configJSON = this.formJSON;
  }
  getFormValues($event): void {
    this.dialogRef.close($event);
  }
}
