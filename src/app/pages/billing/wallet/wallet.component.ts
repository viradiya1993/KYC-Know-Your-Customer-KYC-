import { Component, OnInit } from '@angular/core';
import { WALLET_TABLEDATA } from '../billing.constants'
import { MatDialog } from '@angular/material/dialog';
import { BalanceAlertModal } from './set-bal-alert-modal';
import { GlobalFunctionsService } from 'src/app/services/global-functions.service';
import { StorageService } from 'src/app/services/storage.service';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  tableData: any = {}
  showAll: boolean = true
  searchKey: any = null;
  serviceListing: any[];
  userdata: any;

  constructor(public dialog: MatDialog, public globalFunctionsService: GlobalFunctionsService, public storageService: StorageService, private wrapperService: WrapperServiceService) { }

  ngOnInit(): void {
    this.userdata = this.storageService.getUserUserCredential();
    this.globalFunctionsService.exitIntroJS();
    /* const param = new HttpParams();
    const body = {
      baseuserid: this.userdata.user.id
    };
    const baseOrgData = this.globalFunctionsService.getOrgBaseDetails();
    for (const key in baseOrgData) {
      if (baseOrgData.hasOwnProperty(key)) {
        const element = baseOrgData[key];
        body[key] = element;
      }
    }
    this.wrapperService.walletCreation(param, body).subscribe(result => {
    }); */
    this.tableData = WALLET_TABLEDATA
    let tourRunning = false;
    const isTourRunning = StorageService.getItem('isTourRunning');
    if (isTourRunning !== undefined && isTourRunning == 'true') {
      tourRunning = true;
    }
    if (tourRunning === true) {
        setTimeout(() => {
          this.globalFunctionsService.initIntro();
          this.globalFunctionsService.goToStep(9)
        }, 1000)
    }
  }

  openDialog(rowData: any): void {
    //TODO: Pass the data to the modal and remove dummy data
    const dialogRef = this.dialog.open(BalanceAlertModal, {
      width: '550px',
      data: [{ name: "eric", age: 20 }]
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  toogleViewAll() {
    this.showAll = !this.showAll
  }

  onPagination(event) {
    // console.log("event", event);
    this.serviceListing = event;
  }

  /** Biometric chnage events*/
  changeBioMetric(event: any) {
    // console.log(event)
  }

  /* ID Provider chnages */
  changeIdprovider(event: any) {
    // console.log(event)
  }

  /* reviceve search value */
  receiveSearchValue(searchKey: any) {
    if (this.searchKey !== searchKey) {
      this.searchKey = searchKey;
      // console.log(searchKey);
    }
  }

}
