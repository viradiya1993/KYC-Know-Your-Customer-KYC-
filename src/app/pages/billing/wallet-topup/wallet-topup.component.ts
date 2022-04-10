import { Component, OnInit } from '@angular/core';
import { CustomerData } from './model/customer-data';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-wallet-transaction',
  templateUrl: './wallet-topup.component.html',
  styleUrls: ['./wallet-topup.component.scss']
})
export class WalletTopupComponent implements OnInit {

  userid = "";
  customerEmail = "";
  customerPhoneNumber = "";
  customerLastName = "";
  customerFirstName = "";
  clientUserId = "";
  customersData: CustomerData;
  /* productCode: string = "VR";
  walletCode: string = "VR-W"; */
  productCode: string;
  walletCode: string;
  userdata: any;
  productKey: string = environment.productKey;
  constructor(
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
  ) {
  }

  ngOnInit(): void {
    const walletDetails: any = StorageService.getObject('walletDetails');
    this.userid = walletDetails.userid;
    this.customerEmail = walletDetails.userEmail;
    this.customerFirstName = walletDetails.customerFirstName;
    this.customerLastName = walletDetails.customerLastName;
    this.customerPhoneNumber = walletDetails.customerPhoneNumber;
    this.clientUserId = walletDetails.clientId;
    this.productCode = walletDetails.productCode;
    this.walletCode = walletDetails.walletCode;
    this.customersData = new CustomerData(this.customerEmail, this.customerPhoneNumber, this.customerFirstName, this.customerLastName);
  }
}
