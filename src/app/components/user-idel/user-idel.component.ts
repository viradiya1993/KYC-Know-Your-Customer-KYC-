import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-idel',
  templateUrl: './user-idel.component.html',
  styleUrls: ['./user-idel.component.scss']
})
export class UserIdelComponent implements OnInit {
  interval: any;
  intervalObj: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<UserIdelComponent>, 
    private globalFunctionsService: GlobalFunctionsService,
    private wrapperService: WrapperServiceService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.interval = this.data.interval;
    this.intervalObj = setInterval(() => {
      this.interval = this.interval - 1;
      if (this.interval === 0) {
        clearInterval(this.intervalObj);
        this.dialogRef.close();
        this.globalFunctionsService.isloggedIn.next(false);
        this.wrapperService.logOut();
        this.storageService.logOut();
        StorageService.removeItem('loggedIn');
        this.router.navigateByUrl('/login');
      }
    }, 1000);
  }
  closeModel(value): void {
    clearInterval(this.intervalObj);
    this.dialogRef.close(value);
  }

}
