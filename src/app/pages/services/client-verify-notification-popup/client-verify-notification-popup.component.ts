import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-verify-notification-popup',
  templateUrl: './client-verify-notification-popup.component.html',
  styleUrls: ['./client-verify-notification-popup.component.scss']
})
export class ClientVerifyNotificationPopupComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ClientVerifyNotificationPopupComponent>) { }

  ngOnInit(): void {
  }
  goToVerification(): void {
    this.dialogRef.close(true);
  }

}
