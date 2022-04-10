import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';


@Component({
  selector: 'app-verify-service',
  templateUrl: './verify-service.component.html',
  styleUrls: ['./verify-service.component.scss']
})

export class VerifyServiceComponent implements OnInit, OnDestroy {
  localData = JSON.parse(localStorage.getItem('responseData'));

  constructor(private router: Router, public wrapperService: WrapperServiceService) { }
  ngOnInit(): void {
    if (this.localData == null) {
      this.router.navigate(['/services']);
    } else {
      this.localData.fromWhich = 'validateService';
      this.wrapperService.currentService.next(this.localData.requestData.wrapperData.name);
    }

  }

  retry(): void {
    // console.log("call the retry method from response card");
    this.thirdPartyAPICall(this.localData.requestData);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('responseData');
    localStorage.removeItem('wrapperData')
  }

  thirdPartyAPICall(requestData: any): void {
    const params = new HttpParams();
    let bodyParms = {
    };
    for (const key in requestData.bodyData) {
      if (requestData.bodyData.hasOwnProperty(key)) {
        bodyParms[key] = requestData.bodyData[key];
      }
    }
    const headerParams = requestData.headerData;
    // console.log("headerParams ", headerParams);
    // console.log("bodyParms ", bodyParms);
    /*     this.sessionData.responseData.status = 'VERIFIED';
        sessionStorage.setItem('responseData', JSON.stringify(this.sessionData));
        this.wrapperService.tryAgainResponse.next(this.sessionData); */
    this.wrapperService.callThirdPartyAPI(requestData.wrapperData.endpoint, params, bodyParms, headerParams, 
      requestData.wrapperData.isLive).subscribe(result => {
      // console.log('result ', result);
      this.localData.responseData = result;
      sessionStorage.setItem('responseData', JSON.stringify(this.localData));
      this.wrapperService.tryAgainResponse.next(this.localData);
    });
  }


}
