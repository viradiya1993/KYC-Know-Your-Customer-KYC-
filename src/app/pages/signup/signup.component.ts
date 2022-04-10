import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isEqual } from 'lodash';

import { LINKTYPES, SnackbarType } from '../../models/enums.model';
import { loginConfig } from '../../app-config/signup-config';
import { RoutingEventService } from 'src/app/services/routing-event.service';
import { LandingPageConfig } from '../../models/config';

import { SettingsService } from 'src/app/services/settings.service';
import { UserCreationService } from 'src/app/services/user-creation.service';
import { ConfigService } from 'src/app/services/config-push.service';
import { cleanFormValues } from '../../util/formatter';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageService } from 'src/app/services/storage.service';
import { LOGO, PRODUCT_ID, USER_CATEGORY_ID } from '../../util/constants';
import 'base-frontend/build-dist/lib/auth-module/auth-module';
import 'base-frontend/build-dist/lib/auth-module/signup/signup-container';
import 'base-frontend/build-dist/lib/auth-module/signup/base-signup-container';
import 'base-frontend/build-dist/lib/config-module/base-config';
import 'base-frontend/build-dist/lib/auth-module/signup/signup-usertype-choice';
import 'base-frontend/build-dist/lib/auth-module/signup/signup-email-verification';
import 'base-frontend/build-dist/components/nav/form-top-nav';
import 'base-frontend/build-dist/components/footer/footer';
import "base-frontend-components/dist/src/loaders/lazy-loader";
import { CustomizationService } from 'src/app/services/customization.service';
import french from 'src/assets/templates/french';
import english from 'src/assets/templates/english';
import SnackBar from 'base-frontend/build-dist/components/snackbar/snackbar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

interface UserCategory {
  baseId: string
  displayTitle: string
  emailVerification: boolean
  icon: string
  individualFormConfigName: string
  organizationFormConfigName: string
  subTitle: string
  userTypes: Array<string>
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  showLazyloader: boolean = false;
  snackBar = new SnackBar();
  isForgotPassword: boolean = false;
  landingPageConfig: LandingPageConfig = {
    images: loginConfig.carouselImages,
    headers: loginConfig.carouselHeader,
    texts: loginConfig.carouselText,
  };
  socialButtons = loginConfig.social;
  loginButtonText = loginConfig.signupButtonText;
  formStructure: any;
  productId = PRODUCT_ID;
  preFilledValues: any = {};
  submitted = false;
  lang: string = 'en';
  primaryColor: string = "";
  logo: string = LOGO;
  @ViewChild('baseConfigRef', { static: true }) baseConfig: any;
  @ViewChild('formPreview') formPreview: any;
  signupConfig;
  showUserCategoryPage = true;
  showOtherForm = false;
  selectedUserCategoryId;
  selectedUserCategory: UserCategory;
  steps = ['USER_TYPE', 'BASIC_INFO', 'COMPANY_INFO', 'EMAIL_VERIFICATION'];
  presentStepIndex = 0;
  presentStepName = 'BASIC_INFO';
  showEmailVerification = false;
  selectedUserType = "ORGANIZATION";
  submitText = 'Get Started';
  emailVerificationPayload;
  verificationEmail;
  shouldHideActionBtn: boolean = false
  translation: any;

  constructor(
    private routeEvent: RoutingEventService,
    private settingsService: SettingsService,
    private userCreationService: UserCreationService,
    public configService: ConfigService,
    public loader: LoaderService,
    private storageService: StorageService,
    public translate: TranslateService,
    private customService: CustomizationService,
    private dialogRef: MatDialog
  ) {
    this.primaryColor = "#15C5F8";
  }

  ngOnInit(): void {
    this.translation = english;
    this.translate.use('en');
    this.updateTranslation('french-translation', english);
    
    this.initializeConfig();
    this.preFilledValues = this.storageService.getSignUpDetails();
  }

  initializeConfig(): void {
    this.settingsService.getComponentConfig('basesignup').subscribe((result) => {
      this.customService.setDefaultThemes()

      if (result) {
        this.signupConfig = result

        const category: UserCategory = result.userCategoryInfo[0]
        // this.landingPageConfig = {
        //   images: result.pageConfig.carouselImages,
        //   headers: result.pageConfig.carouselHeader,
        //   texts: result.pageConfig.carouselText,

        // };
        this.socialButtons = result.social;
        this.loginButtonText = result.loginButtonText;
        this.selectedUserCategoryId = USER_CATEGORY_ID;
        this.selectedUserCategory = { ...category, individualFormConfigName: "VERIFIED_SIGNUP", organizationFormConfigName: "VERIFIED_ORG_SIGNUP" }
        this.selectedUserType = category.userTypes[0];
      }

      this.computeSteps();
      this.getNextStep();
    }, (error) => {
      this.showLazyloader = false;
    });
  }

  getSignUpForm(formType: string) {

    this.showLazyloader = true
    this.configService
      .getProductFormType(this.productId, formType)
      .subscribe(
        (result) => {
          if (result.code == 0) {
            this.loader.hide()
            this.formStructure = JSON.parse(result.formData.config);

            this.showLazyloader = false
          } else {
            alert("error has occured");

            // Error here
            // this.showError(result);
            this.routeEvent.goto(LINKTYPES.LOGIN);

            return;
          }
        },
        (error) => {
          // console.log(error);

          // Error here
          // this.showError(error);
          this.routeEvent.goto(LINKTYPES.LOGIN);
        }
      );
  }

  computeSteps() {
    let steps = ['USER_TYPE'];
    if (this.selectedUserCategory.individualFormConfigName) {
      steps = [...steps, 'BASIC_INFO'];
    }
    if (this.selectedUserCategory.organizationFormConfigName && this.selectedUserType !== 'INDIVIDUAL') {
      steps = [...steps, 'COMPANY_INFO'];
    }
    if (this.selectedUserCategory.emailVerification) {
      steps = [...steps, 'EMAIL_VERIFICATION'];
    }

    this.steps = [...steps];
    this.presentStepIndex = 0;
    this.presentStepName = this.steps[this.presentStepIndex];
  }

  getNextStep(prev = false, verifyMail?: boolean) {
    let nextStepIndex;
    let nextStepName;
    if (prev) {
      nextStepIndex = this.presentStepIndex - 1;
    } else {
      nextStepIndex = this.presentStepIndex + 1;
    }
    nextStepName = this.steps[nextStepIndex];

    if(verifyMail){
      nextStepName = 'EMAIL_VERIFICATION'
    }

    if (!nextStepName) {
      this.routeEvent.goto(LINKTYPES.LOGIN);
    }
    switch (nextStepName) {
      case 'USER_TYPE':
        this.presentStepIndex = nextStepIndex;
        this.showUserCategoryPage = true;
        this.showOtherForm = false;
        this.presentStepName = nextStepName;
        return;
      case 'BASIC_INFO':
        this.submitText = 'Get Started';
        this.presentStepIndex = nextStepIndex;
        this.formStructure = null;
        this.getSignUpForm(this.selectedUserCategory.individualFormConfigName);
        this.showUserCategoryPage = false;
        this.showOtherForm = true;
        this.showEmailVerification = false;
        this.presentStepName = nextStepName;
        return;
      case 'COMPANY_INFO':
        this.submitText = 'Signup My Organization';
        this.presentStepIndex = nextStepIndex;
        this.showOtherForm = false;
        this.formStructure = null;
        this.getSignUpForm(this.selectedUserCategory.organizationFormConfigName);
        this.showUserCategoryPage = false;
        this.showOtherForm = true;
        this.showEmailVerification = false;
        this.presentStepName = nextStepName;
        return;
      case 'EMAIL_VERIFICATION':
        this.presentStepIndex = nextStepIndex;
        this.showUserCategoryPage = false;
        this.showOtherForm = false;
        this.showEmailVerification = true;
        this.presentStepName = nextStepName;
        return;
      default: return;
    }
  }

  handleComponentRoute({ detail }: { detail: { type: LINKTYPES } }): void {
    this.routeEvent.goto(detail.type);
  }

  goToSignIn() {
    this.routeEvent.goto(LINKTYPES.LOGIN);
  }

  getFormValueAndSignup(event: any): void {
    let userData = cleanFormValues(event);

    if (!this.steps[this.presentStepIndex + 1] || this.steps[this.presentStepIndex + 1] == 'EMAIL_VERIFICATION') {
      if (this.steps[this.presentStepIndex] == 'COMPANY_INFO') {
        let individualDetails = this.storageService.getSignUpDetails();

        if (individualDetails.email || individualDetails.adminEmail) {     
          this.verificationEmail = individualDetails.email || individualDetails.adminEmail;
        }

        userData = {
          ...userData,
          name: userData.name,
          rcNumberVerified: userData.rcVerificationDetails && userData.rcVerificationDetails.verified ? true : false,
        };
        this.userCreationService.checkOrganisationsForUniqueness({ rcNumber: userData.rcNumber, name: userData.companyName }).subscribe(res => {
          if (res.code == -1) {
            let error = Object.values(res.errors).length > 0 ? Object.values(res.errors).join() : "An error occured!";

            this.dialogRef.open(ErrorDialogComponent, {
              width: "400px",
              data: [error],
            });

            this.formPreview.submitted = false;
            this.formPreview.isVerifying = false;
          } else {           
            this.userCreationService.updatedOrganisationSignup({ orgDetails: userData, adminDetails: individualDetails, productUserCategoryBaseId: this.selectedUserCategoryId, productId: this.productId }).subscribe(res => {
              if (res.code == 0) {
                // this.presentStepIndex = 3
                this.emailVerificationPayload = { userId: res.admin.userId, updateEmailToken: res.updateEmailToken };
                this.getNextStep(false, true);
                this.storageService.clearSignUpDetails();
                this.formPreview.submitted = false;
              } else if (res.code == -1) {

                this.dialogRef.open(ErrorDialogComponent, {
                  width: "400px",
                  data: [res.description],
                });
                this.formPreview.submitted = false;
                return;
              }
            }, (error) => {
              const err = error.description || error.message || error;

              this.dialogRef.open(ErrorDialogComponent, {
                width: "400px",
                data: [err],
              });
              this.formPreview.submitted = false;
            });
          }

        }, (error) => {
          const err = error.description || error.message || error;
          this.dialogRef.open(ErrorDialogComponent, {
            width: "400px",
            data: [err],
          });
          this.formPreview.submitted = false;
        })
      } else if (this.steps[this.presentStepIndex] == 'BASIC_INFO') {
        this.userCreationService
          .signup({ ...userData, productUserCategoryBaseId: this.selectedUserCategoryId }, this.productId)
          .subscribe((result) => {
            if (result.code === 0) {
              
              // added because form changed pattern
              this.getNextStep();
              let userId = result.userId;
              if (!userId) {
                userId = result?.user?.userId;
              }
              this.emailVerificationPayload = { userId, updateEmailToken: result.updateEmailToken };
              this.storageService.clearSignUpDetails();
            } else {
              //Error here
              const err = result.description || result.message;
              this.formPreview.submitted = false;
              this.dialogRef.open(ErrorDialogComponent, {
                width: "400px",
                data: [err],
              });
              return;
            }
          }, (error) => {

            this.formPreview.submitted = false;
            this.dialogRef.open(ErrorDialogComponent, {
              width: "400px",
              data: [error.error],
            });
          })
          .add(() => (this.formPreview.submitted = false));
      }
    } else {
      if (this.steps[this.presentStepIndex] == 'BASIC_INFO') {
        this.userCreationService.checkUsersForUniqueness(userData).subscribe((res) => {

          if (res.code === -1) {
            let error = Object.values(res.errors).length > 0 ? Object.values(res.errors).join() : "An error occured!";

            this.dialogRef.open(ErrorDialogComponent, {
              width: "400px",
              data: [error],
            });

            this.formPreview.submitted = false;
          } else {
            this.storageService.setSignUpDetails(userData);
            this.getNextStep();
          }
        }, (error) => {

          this.dialogRef.open(ErrorDialogComponent, {
            width: "400px",
            data: [error.error],
          });
          this.formPreview.submitted = false;
        }).add(() => (this.formPreview.submitted = false));
      }
    }
  }

  goBack() {
    this.getNextStep(true);
  }

  updateTranslation(filename: string, lang: any): void {
    this.settingsService.getTranslation(filename).subscribe((result) => {
      if (result) {       
        this.translation = { ...result, langText: { ...result.langText, ...lang.langText } };
        this.baseConfig.nativeElement.mainAppJson(result);
      }
    });
  }

  languageChangeEvent({ detail }: { detail: { language: string } }): void {
    if (detail.language.toLowerCase() === 'french') {
      this.translation = french;
      this.translate.use('fr');
      this.updateTranslation('french-translation', french);
    } else if (detail.language.toLowerCase() === 'english') {
      this.translation = english;
      this.translate.use('en');
      this.updateTranslation('english-translation', english);
    }
  }


  //  showError(error) {
  //     this.snackBar.create({
  //       text: error.description || error.message,
  //       duration: 7000,
  //       type: SnackbarType.DANGER,
  //     });
  //   }

  //   showSuccess(response) {
  //     this.snackBar.create({
  //       text: response.description || 'Success',
  //       duration: 7000,
  //       type: SnackbarType.SUCCESS,
  //     });
  //   }

}

