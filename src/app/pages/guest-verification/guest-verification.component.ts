import { Component, OnInit } from '@angular/core';
import "base-frontend/build-dist/components/verification/guest-verification"
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'guest-verification-component',
  templateUrl: './guest-verification.component.html',
})
export class GuestVerificationComponent implements OnInit {
  header: string;
  paragraphOne: string =
    'You have been redirected to the Guest community because you either have not verified your email or you have not been given access to any other page.';
  paragraphTwoStart: string =
    'If you have not verified your email, check your email for the email verification link sent to you when you signed up or click on the link below to resend the email verification link. If you have verified your email,';
  paragraphTwoStressed: string = 'please contact the admin';
  paragraphTwoEnd: string = 'that created your account.';
  buttonText: string = 'Resend Email Verification link';
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
  }

  getTransalation(transalationKey): string{
    return this.translate.instant(transalationKey)
  }
}
