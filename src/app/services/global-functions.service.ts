import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConst } from 'src/app/app.constant';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseOrg } from 'src/app/models/enums.model';
import { Observable, Subject } from 'rxjs';
import * as introJs from 'intro.js/intro.js';
import { RequestModal } from '../pages/billing/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { exit } from 'process';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';

@Injectable({
    providedIn: 'root'
})

export class GlobalFunctionsService {
    baseContextData: any;
    authToken: any;
    userCred: any;
    isloggedIn: Subject<boolean> = new Subject();
    isdismissed: Subject<any> = new Subject();
    productID;
    TranslateInstant: any = {};
    startedIntro: boolean = false;
    modalOpen: boolean = true;
    intro = introJs();
    userName: any;
    constructor(private storageService: StorageService, private translateService: TranslateService, public dialog: MatDialog
    ) {
        this.translateService.get(['']).subscribe(translations => {
            this.TranslateInstant.step1_header = this.translateService.instant('step1_header');
            this.TranslateInstant.step2_header = this.translateService.instant('step2_header');
            this.TranslateInstant.step3_header = this.translateService.instant('step3_header3');
            this.TranslateInstant.step4_header = this.translateService.instant('step4_header');
            this.TranslateInstant.step5_header = this.translateService.instant('step5_header');
            this.TranslateInstant.step6_header = this.translateService.instant('step6_header');
            this.TranslateInstant.step7_header = this.translateService.instant('step7_header');
            this.TranslateInstant.step8_header = this.translateService.instant('step8_header');

            this.TranslateInstant.step8_header8 = this.translateService.instant('step8_header8');

            this.TranslateInstant.step9_header = this.translateService.instant('step9_header');

            this.TranslateInstant.step9_header9 = this.translateService.instant('step9_header9');

            this.TranslateInstant.step10_header = this.translateService.instant('step10_header');
            this.TranslateInstant.step11_header = this.translateService.instant('step11_header');

            this.TranslateInstant.step11_header11 = this.translateService.instant('step11_header11');

            this.TranslateInstant.step12_header = this.translateService.instant('step12_header');

            this.TranslateInstant.step12_header12 = this.translateService.instant('step12_header12');

            this.TranslateInstant.step13_header = this.translateService.instant('step13_header');
            this.TranslateInstant.step14_header = this.translateService.instant('step14_header');

            this.TranslateInstant.step14_header14 = this.translateService.instant('step14_header14');

            this.TranslateInstant.step15_header = this.translateService.instant('step15_header');

            this.TranslateInstant.step16_header16 = this.translateService.instant('step16_header16');

            this.TranslateInstant.step17_header17 = this.translateService.instant('step17_header17');

            this.TranslateInstant.step18_header18 = this.translateService.instant('step18_header18');
            this.TranslateInstant.step19_header19 = this.translateService.instant('step19_header19');


            this.TranslateInstant.step1_intro = this.translateService.instant('step1_intro');
            this.TranslateInstant.step2_intro = this.translateService.instant('step2_intro');

            this.TranslateInstant.step3_intro3 = this.translateService.instant('step3_intro3');
            this.TranslateInstant.step3_click = this.translateService.instant('step3_click');


            this.TranslateInstant.step3_intro1 = this.translateService.instant('step3_intro1');
            this.TranslateInstant.step3_intro2 = this.translateService.instant('step3_intro2');
            this.TranslateInstant.step4_intro1 = this.translateService.instant('step4_intro1');
            this.TranslateInstant.step4_intro2 = this.translateService.instant('step4_intro2');
            this.TranslateInstant.step4_intro3 = this.translateService.instant('step4_intro3');
            this.TranslateInstant.step5_intro = this.translateService.instant('step5_intro');
            this.TranslateInstant.step6_intro = this.translateService.instant('step6_intro');
            this.TranslateInstant.step7_intro = this.translateService.instant('step7_intro');
            this.TranslateInstant.step8_intro = this.translateService.instant('step8_intro');

            this.TranslateInstant.step8_intro8 = this.translateService.instant('step8_intro8');
            this.TranslateInstant.step8_click = this.translateService.instant('step8_click');

            this.TranslateInstant.step9_intro = this.translateService.instant('step9_intro');

            this.TranslateInstant.step9_intro9 = this.translateService.instant('step9_intro9');

            this.TranslateInstant.step10_intro = this.translateService.instant('step10_intro');
            this.TranslateInstant.step11_intro = this.translateService.instant('step11_intro');
            this.TranslateInstant.step11_click = this.translateService.instant('step11_click');

            this.TranslateInstant.step11_intro11 = this.translateService.instant('step11_intro11');

            this.TranslateInstant.step12_intro = this.translateService.instant('step12_intro');

            this.TranslateInstant.step12_intro12 = this.translateService.instant('step12_intro12');
            this.TranslateInstant.step12_click12 = this.translateService.instant('step12_click12');

            this.TranslateInstant.step13_intro = this.translateService.instant('step13_intro');
            this.TranslateInstant.step14_intro = this.translateService.instant('step14_intro');

            this.TranslateInstant.step14_intro14 = this.translateService.instant('step14_intro14');

            this.TranslateInstant.step15_intro1 = this.translateService.instant('step15_intro1');
            this.TranslateInstant.step15_intro2 = this.translateService.instant('step15_intro2');

            this.TranslateInstant.step16_intro16 = this.translateService.instant('step16_intro16');

            this.TranslateInstant.step16_click = this.translateService.instant('step16_click');

            this.TranslateInstant.step17_intro17 = this.translateService.instant('step17_intro17');

            this.TranslateInstant.step18_intro18 = this.translateService.instant('step18_intro18');
            this.TranslateInstant.step18_click18 = this.translateService.instant('step18_click18');

            this.TranslateInstant.step19_intro19 = this.translateService.instant('step19_intro19');


            this.TranslateInstant.step3_info1 = this.translateService.instant('step3_info1');
            this.TranslateInstant.step3_info2 = this.translateService.instant('step3_info2');
        });


    }

    checkPrivilages(whichComponent: string): boolean {
        const userdata: any = this.storageService.getUserUserCredential();
        const contextData: any = this.storageService.getContextData();
        if (userdata && contextData.privileges) {
            const UserPrivilagesArray: any[] = contextData.privileges;
            let hasPrivilage = false;
            for (const key in AppConst.PRIVILAGE_CONSATNT) {
                if (AppConst.PRIVILAGE_CONSATNT.hasOwnProperty(key)) {
                    if (UserPrivilagesArray.includes(AppConst.PRIVILAGE_CONSATNT[whichComponent])) {
                        hasPrivilage = true;
                        break;
                    }
                }
            }
            if (hasPrivilage) {
                return true;
            }
        }
        return false;
    }

    openDownload(Data, origfileName, fileType: string): void {
        let type = '';
        switch (fileType.toLocaleLowerCase()) {
            case 'pdf':
                type = 'data:application/pdf';
                break;
            case 'jpg':
                type = 'data:image/jpeg';
                break;
            case 'jpeg':
                type = 'data:image/jpeg';
                break;
            case 'png':
                type = 'data:image/png';
                break;
            case 'bmp':
                type = 'data:image/bmp';
                break;
            case 'gif':
                type = 'data:image/gif';
                break;
            case 'txt':
                type = 'data:text/plain';
                break;
            case 'rtf':
                type = 'data:application/rtf';
                break;
            case 'xlsx':
                type = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64';
                break;
            case 'xls':
                type = 'data:application/vnd.ms-excel';
                break;
            case 'docx':
                type = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                break;
            case 'doc':
                type = 'data:application/msword';
                break;

        }
        const linkSource = `${type},${Data}`;
        const downloadLink = document.createElement("a");
        const fileName = origfileName;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    getAcessTokenHeaders(): HttpHeaders {
        this.baseContextData = this.storageService.getContextData();
        this.authToken = this.storageService.getAuthUserToken();
        this.userCred = this.storageService.getUserUserCredential();
        this.productID = StorageService.getItem('app-product-id');
        let privileges = [];
        privileges = this.baseContextData.privileges;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'product_id': this.productID,
            'authToken': this.authToken,
            'expected_privileges': JSON.stringify(privileges),
            'baseuserid': this.userCred.user.id,
            'email': this.userCred.user.email
        });
        return headers;
    }
    getIdServicesHeaders(headersData): HttpHeaders {
        const headers: any = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'channel': 'PORTAL',
            'apiKey': headersData?.apiKey,
            'userid': headersData?.userId
        });
        return headers;
    }

    initIntro() {
        this.userName = this.storageService.getUserUserCredential();
        this.intro.setOptions({
            steps: [
                {
                    //1 model
                    tooltipClass: 'introjs-tooltip1',
                    intro: "<img class='intro-banner' src='assets/images/Mask-Group-133.png'> " +
                        "<div class='user-intro'><h4 class='user-name'>" + "Welcome " + this.userName.user.firstName + "," + " " + this.userName.user.lastName + "!</h4>" +
                        "<p>" + this.TranslateInstant.step1_intro + "</p></div>" +
                        "<a class='introjs-tooltipSkip'>Skip tour</a>",
                },

                {
                    //2
                    tooltipClass: 'introjs-tooltip2',
                    element: '#step2_element_id',
                    intro: this.TranslateInstant.step2_intro,
                    position: 'bottom'
                },

                {
                    //3
                    tooltipClass: 'introjs-tooltip3',
                    element: '#Services',
                    title: this.TranslateInstant.step3_header,
                    intro: this.TranslateInstant.step3_intro3 + '<a href="#/services" style="color:#48b971">' + this.TranslateInstant.step3_click + '</a>',
                    position: 'right'
                },

                {
                    //4
                    element: "#step4_element_id",
                    title: this.TranslateInstant.step4_header,
                    intro: this.TranslateInstant.step4_intro1 + ' ' +
                        '<a href="https://verifiedng.readme.io/docs"  target="_blank" style="color:#48b971">' +
                        this.TranslateInstant.step4_intro3 + '</a> .' + this.TranslateInstant.step4_intro2 + ' ' +
                        '<a href="https://verifiedng.readme.io/docs"  target="_blank" style="color:#48b971">' +
                        this.TranslateInstant.step4_intro3 + '</a>',
                    position: 'top',
                },

                {
                    //5
                    tooltipClass: 'introjs-tooltip-service',
                    element: "#openUseServiceDialog_0",
                    title: this.TranslateInstant.step5_header,
                    intro: this.TranslateInstant.step5_intro,
                    position: 'top'
                },

                {
                    //6
                    element: "#slide-toggle940",
                    title: this.TranslateInstant.step6_header,
                    intro: this.TranslateInstant.step6_intro,
                    position: 'right'
                },

                {
                    //7
                    element: "#wallet_id",
                    title: this.TranslateInstant.step7_header,
                    intro: this.TranslateInstant.step7_intro,
                    position: 'top'
                    // preChange: function () {
                    //     this.element = document.querySelector('#service_id_0');
                    //     this.position = "right";
                    // }
                },

                {
                    //8
                    tooltipClass: 'introjs-tooltip3',
                    element: '#Billing',
                    title: this.TranslateInstant.step8_header8,
                    intro: this.TranslateInstant.step8_intro8 + '<a href="#/billing" style="color:#48b971">' + this.TranslateInstant.step8_click + '</a>',
                    position: 'right'
                },

                {
                    //9
                    element: "#main_card",
                    title: this.TranslateInstant.step9_header9,
                    intro: this.TranslateInstant.step9_intro9,
                    position: 'right'
                },

                {
                    //10
                    tooltipClass: 'introjs-tooltip-service',
                    element: "#main_card_topup",
                    title: this.TranslateInstant.step8_header,
                    intro: this.TranslateInstant.step8_intro,
                    position: 'right'
                },

                // {
                //     //11
                //     element: "#step9_element_id",
                //     title: this.TranslateInstant.step9_header,
                //     intro: this.TranslateInstant.step9_intro,
                //     position: 'bottom'
                // },

                {
                    //11
                    element: "#step9_element_id",
                    title: this.TranslateInstant.step11_header11,
                    intro: this.TranslateInstant.step11_intro11,
                    position: 'top'
                },

                {
                    //12
                    tooltipClass: 'introjs-tooltip12',
                    element: "#step12_element_0",
                    title: this.TranslateInstant.step12_header12,
                    intro: this.TranslateInstant.step12_intro12 + '<a href="javascript:void(0)" style="color:#48b971">' + this.TranslateInstant.step12_click12 + '</a>',
                    position: 'top'
                },

                {
                    //13
                    highlightClass: 'introjs-highlightClass10',
                    element: "#step10_element_id",
                    title: this.TranslateInstant.step10_header,
                    intro: this.TranslateInstant.step10_intro,
                    position: 'right',
                },

                {
                    //14
                    tooltipClass: 'introjs-tooltip3',
                    element: "#Bulk-Verifications",
                    title: this.TranslateInstant.step11_header,
                    intro: this.TranslateInstant.step11_intro + '<a href="#/bulk-verification" style="color:#48b971">' + this.TranslateInstant.step11_click + '</a>',
                    position: 'right'
                },

                {
                    //15
                    element: "#step14_element_id",
                    title: this.TranslateInstant.step14_header14,
                    intro: this.TranslateInstant.step14_intro14,
                    position: 'right'
                },

                {
                    //16
                    tooltipClass: 'introjs-tooltip3',
                    element: "#Transactions",
                    title: this.TranslateInstant.step16_header16,
                    intro: this.TranslateInstant.step16_intro16 + '<a href="#/transactions" style="color:#48b971">' + this.TranslateInstant.step16_click + '</a>',
                    position: 'right'
                },

                {
                    //17
                    element: "#step16_element_id",
                    title: this.TranslateInstant.step17_header17,
                    intro: this.TranslateInstant.step17_intro17,
                    position: 'right'
                },

                // {
                //     //18
                //     element: "#step18_element_id",
                //     title: this.TranslateInstant.step17_header17,
                //     intro: this.TranslateInstant.step17_intro17,
                //     position: 'right'
                // },

                {
                    //18
                    tooltipClass: 'introjs-tooltip3',
                    element: "#step19_element_id",
                    title: this.TranslateInstant.step18_header18,
                    intro: this.TranslateInstant.step18_intro18 + '<a href="#/transactions/all" style="color:#48b971">' + this.TranslateInstant.step18_click18 + '</a>',
                    position: 'bottom'
                },

                {
                    //19
                    element: "#step20_element_id",
                    title: this.TranslateInstant.step19_header19,
                    intro: this.TranslateInstant.step19_intro19,
                    position: 'bottom'
                },

                // {
                //     //21
                //     title: this.TranslateInstant.step14_header,
                //     intro: this.TranslateInstant.step14_intro,
                //     position: 'right'
                // },

                {
                    //20
                    tooltipClass: 'introjs-tooltip1',
                    intro: "<img class='intro-banner' src='assets/images/Mask-Group-133.png'> " +
                        "<div class='user-intro'><h4 class='user-name'>" + this.TranslateInstant.step15_header + "</h4>" +
                        "<p>" + this.TranslateInstant.step15_intro1 + "</p>" +
                        "<p>" + this.TranslateInstant.step15_intro2 + "</p></div>" +
                        "<div class='video-play'><a href='#/onboarding'>" +
                        "<img src='assets/images/Path-15126.png'> <span>Play tour</span></a></div>",
                },
            ],
            disableInteraction: true,
            showBullets: false,
            showButtons: true,
            showStepNumbers: true,
            exitOnOverlayClick: false,
            keyboardNavigation: true,
            scrollToElement: true,
            scrollTo: 'tooltip'
        });
        this.intro.onbeforechange((targetElement) => {
            window.scrollTo(0, 0);
        });
        this.intro.onafterchange((targetElement) => {
            // if (this.intro._currentStep == 3) {
            //     window.location.href = '#/services';
            // }
            if (
                this.intro._currentStep === 2
                || this.intro._currentStep === 3
                || this.intro._currentStep === 7
                || this.intro._currentStep === 8
                || this.intro._currentStep === 13
                || this.intro._currentStep === 14
                || this.intro._currentStep === 15
                || this.intro._currentStep === 16
            ) {
                toggle();
            }
            if (this.intro._currentStep === 2) {
                if (!this.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.VIEW_SERVICES_PAGE)) {
                    toggle();
                    this.intro.goToStep(7);
                }
            }
            if (this.intro._currentStep === 7) {
                if (!this.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.VIEW_BILLING_PAGE)) {
                    if (!this.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.VIEW_BULK_VERIFICATION_PAGE)) {
                        if (!this.checkPrivilages(AppConst.PRIVILAGE_CONSATNT.VIEW_TRANSACTIONS_PAGE)) {
                            this.intro.goToStep(20);
                        } else {
                            toggle();
                            this.intro.goToStep(16);
                        }
                    } else {
                        toggle();
                        this.intro.goToStep(14);
                    }
                }
            }
            if (this.intro._currentStep == 6) {
                window.location.href = '#/onboarding';
            }
            // if (this.intro._currentStep == 7) {
            //     window.location.href = '#/billing/wallet';
            // }
            /* if (this.intro._currentStep == 10) {
                window.location.href = '#/billing';
            } */

            if (this.intro._currentStep == 12) {
                // console.log(this.modalOpen, 'model open')
                if (this.modalOpen === true) {
                    const rowData = [
                        {
                            "wrapper_pk": "940",
                            "band_name": "BVN full details band1",
                            "band_limit": "11",
                            "band_price": "90",
                            "band_min_units": "1",
                            "band_max_units": "10",
                            "band_order": 1,
                            "band_id": "1"
                          },
                          {
                            "wrapper_pk": "940",
                            "band_name": "BVN full details band2",
                            "band_limit": "36",
                            "band_price": "80",
                            "band_min_units": "11",
                            "band_max_units": "25",
                            "band_order": 2,
                            "band_id": "2"
                          },
                          {
                            "wrapper_pk": "940",
                            "band_name": "BVN full details band3",
                            "band_limit": "76",
                            "band_price": "70",
                            "band_min_units": "26",
                            "band_max_units": "50",
                            "band_order": 3,
                            "band_id": "3"
                          },
                          {
                            "wrapper_pk": "940",
                            "band_name": "BVN full details band4",
                            "band_limit": "151",
                            "band_price": "60",
                            "band_min_units": "51",
                            "band_max_units": "100",
                            "band_order": 4,
                            "band_id": "4"
                          },
                          {
                            "wrapper_pk": "940",
                            "band_name": "BVN full details band5",
                            "band_limit": "601",
                            "band_price": "25",
                            "band_min_units": "101",
                            "band_max_units": "500",
                            "band_order": 5,
                            "band_id": "5"
                          }
                    ];
                    const dialogRef = this.dialog.open(RequestModal, {
                        width: '550px',
                        data: [...rowData, 'BVN Verification Full Details Service']
                    });
                }
                this.modalOpen = false;

            }
            if (this.intro._currentStep == 13) {
                this.dialog.closeAll();
            }
            function toggle(): void {
                let element = document.getElementById("menu-Main");
                element.classList.toggle("menu-open");
                document.body.classList.toggle("main-menu");
            }
            // if (this.intro._currentStep == 10) {
            //     window.location.href = '#/bulk-verification';
            // }
            // if (this.intro._currentStep == 11) {
            //     window.location.href = '#/transactions/all';
            // }
        })
        this.intro.oncomplete(function () {
            StorageService.removeItem('isTourRunning');
            window.location.href = '#/onboarding';
        });
        this.intro.onexit(function () {
            // console.log('onexit')
        })

        this.intro.start();
        setTimeout(() => {
            if (document.querySelector(".introjs-tooltipSkip")) {
                let SkipButton = document.querySelector(".introjs-tooltipSkip");
                SkipButton.addEventListener('click', this.skipTour.bind(this));
            }

            if (document.querySelector(".introjs-skipbutton")) {
                let closeButton = document.querySelector(".introjs-skipbutton");
                closeButton.addEventListener('click', this.closeStep.bind(this));
            }
        }, 100);
    }

    skipTour(): void {
        this.isdismissed.next(true);
        StorageService.removeItem('isTourRunning');
        this.intro.exit();
        window.location.href = '#/onboarding';
    }

    closeStep(): void {
        this.isdismissed.next(true);
        StorageService.removeItem('isTourRunning');
        window.location.href = '#/onboarding';
    }



    goToStep(step): void {
        this.intro.goToStep(step);
    }

    refreshIntro(): void {
        this.intro = introJs();
    }
    exitIntroJS(): void {
        this.intro.exit();
    }

    getOrgBaseDetails(): BaseOrg {
        let baseOrgData: BaseOrg;
        let baseORGTmp: any = {};
        let currentContext: any = this.storageService.getCurrentContextData();
        let loginUserData: any = this.storageService.getUserUserCredential();
        baseORGTmp.baseOrg = loginUserData.user.orgId;
        baseORGTmp.baseProduct = currentContext.productBaseId;
        baseORGTmp.baseProductUserCategoryCode = currentContext.productUserCategoryCode;
        baseORGTmp.baseProductUserCategoryId = currentContext.productUserCategoryBaseId;
        baseOrgData = baseORGTmp;
        return baseOrgData;
    }
}
