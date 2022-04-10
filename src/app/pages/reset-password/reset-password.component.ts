import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingEventService } from 'src/app/services/routing-event.service';
import { SettingsService } from 'src/app/services/settings.service';
import 'base-frontend/build-dist/lib/forget-password-module/reset-password/reset-password';
import { passwordPolicies, resetPasswordConfig } from 'src/app/app-config/password';
import { IInput } from 'src/app/models/config';
import { LINKTYPES } from 'src/app/models/enums.model';

@Component({
  selector: 'reset-password-component',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private routeEvent: RoutingEventService,
    private activatedRoute: ActivatedRoute,
    private settingsService: SettingsService
  ) {}

  resetPasswordConfig: {
    passwordPolicies: Array<any>;
    inputs: Array<IInput>;
  } = {
    passwordPolicies: passwordPolicies,
    inputs: resetPasswordConfig.fieldProperties,
  };
  token: string;

  handleComponentRoute({ detail }: { detail: { type: LINKTYPES } }):void {  
    this.routeEvent.goto(detail.type);
  }

  ngOnInit():void {
    this.activatedRoute.queryParams.subscribe((query) => {
      const { token } = query;
      this.token = token;
    });
    this.initializeConfig();
  }

  initializeConfig():void {
    this.settingsService
      .getComponentConfig('reset-password')
      .subscribe((result) => {
        if (result) {
          this.resetPasswordConfig = {
            passwordPolicies: result.passwordPolicies,
            inputs: result.fieldProperties,
          };
        }
      });
  }
}
