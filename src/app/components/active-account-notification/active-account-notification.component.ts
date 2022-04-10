import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-account-notification',
  templateUrl: './active-account-notification.component.html',
  styleUrls: ['./active-account-notification.component.scss']
})
export class ActiveAccountNotificationComponent implements OnInit {

  constructor() { }
  isShow: boolean;
  ngOnInit(): void {
    this.isShow=true;
    this.notificationClose();
  }

  notificationClose(){
    this.isShow=false;
    document.body.classList.toggle('has-top-notification');
  }

}
