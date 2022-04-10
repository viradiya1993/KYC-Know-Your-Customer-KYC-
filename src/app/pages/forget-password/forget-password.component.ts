import { Component } from '@angular/core';
import 'base-frontend/build-dist/lib/forget-password-module/forget-password';
import { RoutingEventService } from 'src/app/services/routing-event.service';
import { SettingsService } from 'src/app/services/settings.service';
import { LINKTYPES } from 'src/app/models/enums.model';
import { LOGO } from 'src/app/util/constants';
import { ICountry, IInput } from 'base-frontend/build-dist/model/input';
import { forgotPasswordConfig } from 'src/app/app-config/password';

import { environment } from "src/environments/environment";

const {IMAGE_SLIDER1} = environment
@Component({
  selector: 'forget-password-component',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  logo:string = LOGO
  constructor(
    private routeEvent: RoutingEventService,
    private settingsService: SettingsService,
  ) {}
  isAvaliable: boolean;
  forgetPasswordConfigData: any;
  forgetPasswordConfig: {
    countriesList: Array<ICountry>;
    fieldProperties: Array<IInput>;
  } = forgotPasswordConfig;
  logoUrl:any;
  image: string = "";

  handleComponentRoute({ detail }: { detail: { type: LINKTYPES } }) {
    this.routeEvent.goto(detail.type);
  }

  routeToLogin(){
    this.routeEvent.goto(LINKTYPES.LOGIN)
  }

  ngOnInit(): void {
    this.initializeConfig();
  }

  initializeConfig():void {
    this.settingsService
      .getComponentConfig('forget-password')
      .subscribe((result) => {      
        if (result) {
          this.forgetPasswordConfigData = result;
          this.image = IMAGE_SLIDER1
          this.forgetPasswordConfig = {
            countriesList: result.countriesList,
            fieldProperties: result.fieldProperties,
          };
          this.isAvaliable = true;
        }
      });
  }
}
