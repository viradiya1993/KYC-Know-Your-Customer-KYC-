import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WrapperServiceService } from 'src/app/services/wrapper-services/wrapper-service.service';

@Component({
  selector: 'app-verify-users-result',
  templateUrl: './verify-users-result.component.html',
  styleUrls: ['./verify-users-result.component.scss']
})
export class VerifyUsersResultComponent implements OnInit, OnDestroy {
  sessionData = JSON.parse(sessionStorage.getItem('responseData'));
  constructor(private router: Router, public wrapperService: WrapperServiceService) { }

  ngOnInit(): void {
    if (this.sessionData == null) {
      this.router.navigate(['/bulk-verification']);
    } else {
      // console.log("sessionData ", this.sessionData);
      this.wrapperService.currentService.next(this.sessionData.requestData.wrapperData.name);
    }
  }
  ngOnDestroy(): void {
    sessionStorage.clear();
  }
}
