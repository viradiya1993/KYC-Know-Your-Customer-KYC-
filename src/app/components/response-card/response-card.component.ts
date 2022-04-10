import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';
import { AppConst } from 'src/app/app.constant';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionsResultComponent } from 'src/app/pages/transactions/transactions-result/transactions-result.component';


@Component({
  selector: 'app-response-card',
  templateUrl: './response-card.component.html',
  styleUrls: ['./response-card.component.scss']
})
export class ResponseCardComponent implements OnInit {
  @Output() tryAgain = new EventEmitter<string>();
  @Input() responseJson: any;

  @Output() closerevent = new EventEmitter<any>();

  whichWrapperResponse: string;
  localData = JSON.parse(localStorage.getItem('responseData'));
  responseCardJSON: any;
  VerificationType: any;
  VerificationStatusEnum: any;

  constructor(private router: Router, public wrapperService: WrapperServiceService) { }

  ngOnInit(): void {
    this.VerificationType = AppConst.VERIFICATIONRTYPES;
    this.VerificationStatusEnum = AppConst.VerificationStatus;
    this.setResponseData();
    this.assignTryAgianResponseData();
  }

  setResponseData(): void {


    //BVN|VAL|NIBBS|0001 for bvn full details
    // VER|UVERIFY|BVN|0001 bvn boolean semfix
    if (this.responseJson.keyfrom === 'bulk-verification') {
      this.whichWrapperResponse = 'BULK';
      this.responseCardJSON = this.responseJson;
    } else if (this.responseJson.keyfrom === 'service') {
      this.responseCardJSON = {
        responseCode: this.responseJson.responseData.responseCode,
        description: this.responseJson.responseData.description,
        verificationType: this.responseJson.responseData.verificationType,
        verificationStatus: this.responseJson.responseData.verificationStatus,
        transactionStatus: this.responseJson.responseData.transactionStatus,
        transactionReference: this.responseJson.responseData.transactionReference,
        transactionDate: this.responseJson.responseData.transactionDate,
        searchParameter: this.responseJson.responseData.searchParameter,
      };
      let responseData: any;
      switch (this.responseCardJSON.verificationType) {
        case this.VerificationType.BVN_FUll_DETAILS:
          this.whichWrapperResponse = this.responseCardJSON.verificationType;
          responseData = this.responseJson.responseData.response;
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
        case this.VerificationType.NIN_SEARCH:
          this.whichWrapperResponse = this.responseCardJSON.verificationType;
          if (this.responseJson.responseData.response.length > 0 && this.responseJson.responseData.response[0] !== undefined) {
            responseData = this.responseJson.responseData.response[0];
          }
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
        case this.VerificationType.BVN_VERIFICATION:
          this.whichWrapperResponse = this.responseCardJSON.verificationType;
          responseData = this.responseJson.responseData.response;
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
        case this.VerificationType.BVN_BOOLEAN_MATCH:
          this.whichWrapperResponse = this.responseCardJSON.verificationType;
          responseData = this.responseJson.responseData.response;
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
        case this.VerificationType.NIN_DEMOGRAPHIC_SEARCH:
          this.whichWrapperResponse = this.responseCardJSON.verificationType;
          if (this.responseJson.responseData.response.length > 0 && this.responseJson.responseData.response[0] !== undefined) {
            responseData = this.responseJson.responseData.response[0];
          }
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
        case this.VerificationType.NIN_PHONE_SEARCH:
          this.whichWrapperResponse = this.responseCardJSON.verificationType;
          if (this.responseJson.responseData.response.length > 0 && this.responseJson.responseData.response[0] !== undefined) {
            responseData = this.responseJson.responseData.response[0];
          }
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
        case this.VerificationType.NIN_FINGER_SEARCH:
          this.whichWrapperResponse = this.responseCardJSON.verificationType;
          if (this.responseJson.responseData.response.length > 0 && this.responseJson.responseData.response[0] !== undefined) {
            responseData = this.responseJson.responseData.response[0];
          }
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
        case this.VerificationType.RC_VERIFICATION:
          this.whichWrapperResponse = this.responseCardJSON.verificationType;
          responseData = this.responseJson.responseData.response;
          if (this.responseJson.responseData.response.length > 0 && this.responseJson.responseData.response[0] !== undefined) {
            responseData = this.responseJson.responseData.response[0];
          }
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
      }
    } else if (this.responseJson.keyfrom === 'trasactions') {
      this.responseCardJSON = {
        responseCode: this.responseJson.responseData.responseCode,
        description: this.responseJson.responseData.description,
        verificationType: this.responseJson.responseData.verificationType,
        verificationStatus: this.responseJson.responseData.verificationStatus,
        transactionStatus: this.responseJson.responseData.transactionStatus,
        transactionReference: this.responseJson.responseData.transactionReference,
        transactionDate: this.responseJson.responseData.transactionDate,
        searchParameter: this.responseJson.responseData.searchParameter,
      };
      this.whichWrapperResponse = this.responseCardJSON.verificationType;
      let responseData: any;
      switch (this.responseCardJSON.verificationType) {
        case this.VerificationType.BVN_FUll_DETAILS:
          responseData = this.responseJson.responseData.response;
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
        case this.VerificationType.NIN_SEARCH:
          if (this.responseJson.responseData.response.length > 0 && this.responseJson.responseData.response[0] !== undefined) {
            responseData = this.responseJson.responseData.response[0];
          }
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
        case this.VerificationType.BVN_VERIFICATION:
          responseData = this.responseJson.responseData.response;
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
        case this.VerificationType.BVN_BOOLEAN_MATCH:
          responseData = this.responseJson.responseData.response;
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
        case this.VerificationType.NIN_DEMOGRAPHIC_SEARCH:
          if (this.responseJson.responseData.response.length > 0 && this.responseJson.responseData.response[0] !== undefined) {
            responseData = this.responseJson.responseData.response[0];
          }
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
        case this.VerificationType.NIN_PHONE_SEARCH:
          if (this.responseJson.responseData.response.length > 0 && this.responseJson.responseData.response[0] !== undefined) {
            responseData = this.responseJson.responseData.response[0];
          }
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
        case this.VerificationType.NIN_FINGER_SEARCH:
          if (this.responseJson.responseData.response.length > 0 && this.responseJson.responseData.response[0] !== undefined) {
            responseData = this.responseJson.responseData.response[0];
          }
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
        case this.VerificationType.RC_VERIFICATION:
          responseData = this.responseJson.responseData.response;
          if (this.responseJson.responseData.response.length > 0 && this.responseJson.responseData.response[0] !== undefined) {
            responseData = this.responseJson.responseData.response[0];
          }
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const element = responseData[key];
              this.responseCardJSON[key] = element;
            }
          }
          break;
      }
    }
  }

  assignTryAgianResponseData(): void {
    this.wrapperService.tryAgainResponse.subscribe(result => {
      this.responseJson = result;
      this.setResponseData();
    });
  }

  /* Redirect service page */
  goToServices(): void {
    if (this.responseJson.keyfrom === 'service') {
      this.router.navigate(['/services']);

    } else {
      this.closerevent.next();

    }
  }

  goToBulk(): void {
    this.router.navigate(['/bulk-verification']);
  }

  callTryAgain(): void {
    this.tryAgain.next();
  }



}
