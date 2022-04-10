import { Component, OnInit } from '@angular/core';
import 'base-frontend/build-dist/lib/auth-module/login/reset-on-login-page';
// import { StorageService } from 'src/app/services/storage.service';
import { RoutingEventService } from 'src/app/services/routing-event.service';
import { LINKTYPES } from 'src/app/models/enums.model';
import { LOGO } from 'src/app/util/constants';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'reset-on-login-component',
  templateUrl: './reset-on-login.component.html',
  styleUrls: ['./reset-on-login.component.css'],
})
export class ReseOnLoginComponent implements OnInit {
  logo:string = LOGO;
  logoUrl:any;
  productName: any

  constructor(private routeEvent: RoutingEventService, private storageService: StorageService) {}

  ngOnInit(){
    // this.logoUrl =  this.storageService.getLogo();
    // if(this.logoUrl){
    //   this.logo = null;
    // }
  }

  handleComponentRoute({ detail }: { detail: { type: LINKTYPES } }) {
    // console.log(detail);
    
    this.routeEvent.goto(detail.type);
  }
}
