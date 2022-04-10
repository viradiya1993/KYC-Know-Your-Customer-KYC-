import { Component } from '@angular/core';
import 'base-frontend/build-dist/lib/forget-password-module/reset-link-sent-page/reset-link-sent-page'
import { LINKTYPES } from 'src/app/models/enums.model';
import { RoutingEventService } from 'src/app/services/routing-event.service';

@Component({
  selector: 'reset-link-component',
  templateUrl: './reset-link.component.html',
  styleUrls: ['./reset-link.component.css'],
})
export class ResetLinkComponent {
  constructor(private routeEvent: RoutingEventService) {}

  handleComponentRoute({ detail }: { detail: { type: LINKTYPES } }) {
    this.routeEvent.goto(detail.type);
  }
}
