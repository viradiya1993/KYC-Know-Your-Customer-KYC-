import { Component, OnInit } from '@angular/core';
import * as token from '../assets/Json/token.json';
import { LanguageService } from 'src/app/services/language.service';
import { ScrolltopService } from './services/scrolltop.service';
import { StorageService } from './services/storage.service';
import { GlobalFunctionsService } from './services/global-functions.service';


import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  title = 'KYC';
  tokens: any = (token as any).default;
  isVerifyBusinessOpen = true;
  isloggedIn = false;

  constructor(
    private scrollTop: ScrolltopService, public languageService: LanguageService, public storageService: StorageService,
    private globalFunctionsService: GlobalFunctionsService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const userdata = this.storageService.getUserUserCredential();
    if (userdata && userdata.user) {
      this.isloggedIn = true;
    }
    this.globalFunctionsService.isloggedIn.subscribe(result => {
      this.isloggedIn = result;
    });

    if (this.isVerifyBusinessOpen) {
      document.body.classList.add('has-top-notification');
    } else {
      document.body.classList.remove('has-top-notification');
    }

    this.scrollTop.setScrollTop();
  }
}
