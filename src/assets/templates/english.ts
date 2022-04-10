import * as en from './en.json'

export default {
  metadata: {
    version: 1.0,
    langTag: 'en',
    langFamily: 'English',
    langVariant: 'American English',
    supportedLanguages: ['English', 'French'],
  },
  langText: {
    ...en,
    newUserInquiry: 'New user?',
    signupLink: 'Sign up',
    signinLink: "Sign In",
    contactSupport: 'Contact support',
    rightReserved: 'All rights reserved © 2021 Seamfix',
    privacyTerm: 'Privacy | Terms',
    appName: 'Verified',
    goBack: "Go Back",
    gotAnAccount: "Got an Account?",
    gotoLogin: "Goto Login",
    organizationName: 'SEAMFIX',
    carouselHeader1: 'Verified - All New & Improved',
    carouselHeader2: 'Did you know...',
    carouselHeader3: 'Simple API Integrations',
    carouselHeader4: '5 things Verified does best and fast.',
    carouselText1: 'Enjoy the brand new look and feel of Verified with everything in place for you to easily get started with verifying identities online',
    carouselText2: 'It is estimated worldwide that since 2005, identity theft victims are over 500 million with an associated cost of over $200 billion to businesses worldwide? Lucky we have verified! Source: GSMA',
    carouselText3: 'Everything you’d need to get started with building trust one identity at a time.',
    carouselText4: 'Identification, Validation, Verification, Quality check, and Authentication',
    baseAuthHeader1: "Create Surveys & Verify your employees",
    baseAuthHeader2: "Create Surveys & Verify your employees",
    baseAuthSubText1: "Enjoy the brand new look and feel of Verified with everything in place for you to easily get started with verifying identities online.",
    baseAuthSubText2: "Start verifying identities with Verified.ng",
    signinText: 'Sign In',
    loginConfigEmailAddressLabelKey: 'Enter Address',
    loginConfigEmailAddressPlaceholderKey: 'Enter Email Address',
    loginConfigEmailInvalidKey: 'Email is not valid',
    loginConfigEmailRequiredKey: 'Email is required',
    loginConfigEmailLengthKey:
      'Email length too short, must be 5 characters and above',

    loginConfigUsernameAddressLabelKey: 'Username',
    loginConfigUsernameAddressPlaceholderKey: 'Enter Username',
    loginConfigUsernameInvalidKey: 'Username is not valid',
    loginConfigUsernameRequiredKey: 'Username is required',
    loginConfigUsernameLengthKey:
      'Username length too short, must be 2 characters and above',
    loginConfigPhoneAddressLabelKey: 'Phone Number',
    loginConfigPhoneAddressPlaceholderKey: 'Enter Phone Number',
    loginConfigPhoneInvalidKey: 'Phone Number is not valid',
    loginConfigPhoneRequiredKey: 'PhoneNumber is required',
    loginConfigPhoneLengthKey:
      'Phone number is not valid must be 11 digits long',
    loginConfigPhoneMaxLengthKey:
      'PhoneNumber length too short, must be 13 numbers and above',

    loginConfigPasswordLabelKey: 'Password',
    loginConfigPasswordsPlaceholderKey: 'Enter Password',
    loginConfigPasswordInvalidKey: 'Password not valid',
    loginConfigPasswordRequiredKey: 'Password is required',
    loginConfigPasswordLengthKey:
      'Password length too short, must be 5 characters and above, include a special character and a number',
    forgotPasswordConfigPhoneLabelKey: 'Phone Number',
    forgotPasswordConfigPhonePlaceholderKey: 'Enter Phone number',
    forgotPasswordConfigPhoneInvalidKey: 'Phone number not valid',
    forgotPasswordConfigPhoneRequiredKey:
      'Your phone number is require for password reset',
    forgotPasswordConfigPhoneLengthKey:
      'Phone number is not valid must be 11 digits long',

    forgotPasswordEmailAddressLabelKey: 'Enter Address',
    forgotPasswordEmailAddressPlaceholderKey: 'Enter Email Address',
    forgotPasswordEmailInvalidKey: 'Email is not valid',
    forgotPasswordEmailRequiredKey: 'Email is required',
    forgotPasswordEmailLengthKey:
      'Email length too short, must be 5 characters and above',

    regexAtleastOneDigit: 'Password must contain at least one digit',
    regexAtLeastOneLowercase: 'Password must contain at least one lowercase',
    resetPasswordConfigPasswordLabelKey: 'Password',
    resetPasswordConfigPasswordPlaceholderKey: 'Enter Password',
    resetPasswordConfigPasswordInvalidKey: 'Password not valid',
    resetPasswordConfigPasswordRequiredKey:
      'Password is require for password reset',
    resetPasswordConfigPasswordLengthKey:
      'Password is not valid must be 11 digits long',

    resetPasswordFormSuccess: 'Password changed successfully',
    resetPasswordFormBackToSignIn: 'Back to sign in',
    resetPasswordFormHeader: 'Reset Password',
    resetPasswordFormSetPasswordText: 'Set your new password',
    resetPasswordFormBtnText: 'Reset Password',
    resetPasswordImageHeader: 'Time for a change',
    resetPasswordImageText: 'Create a new password for your account.',

    forgetPasswordHeaderText: 'Forgot Password',
    forgetPasswordEmailAddress:
      'Enter the email address associated with your account',
    forgetPasswordPhoneNumber:
      'Enter the phone number associated with your account',
    forgetPasswordAccount:
      'Enter the email or phone number associated with your account',
    forgetPasswordBtnText: 'Reset Password',
    forgetPasswordImageHeader: 'Hey!',
    forgetPasswordImageText:
      'Forgot your password? Quickly reset it by providing your email.',

    changePasswordFormHeader: 'Change Password',
    changePasswordFormBtnText: 'Change Password',
    changePasswordFormSetPasswordText:
      'Change the default password sent to your email',

    resetLinkEmailHeader: 'Check your inbox',
    resetLinkPhoneHeader: 'Check your messages',
    resetLinkEmailMessage:
      'A password reset has been sent to the email address above. Please click the password reset link in  the email to set a new password',
    resetLinkPhoneMessage:
      'A password reset has been sent to the Phone number above. Please click the password reset link in  the message to set a new password',
    notYourEmail: 'Not your email?',
    notYourPhoneNumber: 'not your Phone Number',
    enterDifferentEmail: 'Enter different mail',
    enterDifferentPhoneNumber: 'Enter different Phone Number',
    needHelp: 'Need help?',

    successBannerMessage: 'password is secure and all set!',

    welcomeBack: 'Login',
    signinToContinue: "Provide your login details",
    socialGoogleText: 'Sign in with Google',
    // troubleSigninInquiry: 'Trouble signing in?',
    forgetText: 'Forgot Password?',
    otpConfirmBtn: 'Confirm OTP',
    otpHeader: 'Enter OTP',
    otpHeaderTextInit: 'We sent a ',
    otpHeaderTextFinal: 'digit confirmation code to',
    otpNotSeen: 'Haven’t received the OTP?',
    resendOtp: 'Send it again',
    emailIsRequired: 'Email is required',
    usernameIsRequired: 'Username is required',
    passwordIsRequired: 'Password is required',
    prefixIsRequired: 'is required',
    emailPatternMessage:
      'Only include characters a-z & A-Z, Numbers 0-9, Symbols fullstop (.) hyphen (-) and underscore(_) and characters not less than 2 before the @ in your email address',
    passwordPatternMessage:
      'Length of password should not be less than 6 characters. No space allowed',
    usernamePatternMessage:
      'Should only contain Alphabet, Numbers and dashes(-). No space allowed and at least 3 character',
    fillFieldWarning: 'Please fill out this field',

    createUserHeading: 'Create User',
    createUserHeadingText:
      'Create users to join you on The Base to collaborate on projects',
    createUserCheckboxtext: 'Create Another',
    createUserBtnText: 'Create',
    createUserConfigTitleLabelKey: 'Title',
    createUserConfigTitlePlaceholderKey: 'Title',
    createUserConfigTitleOptionKey1: 'Mr',
    createUserConfigTitleOptionKey2: 'Mrs',
    createUserConfigTitleOptionKey3: 'Miss',
    createUserConfigTitleRequiredKey: 'Title is required',
    createUserConfigFirstNameLabelKey: 'First Name',
    createUserConfigFirstNamePlaceholderKey: 'First Name',
    createUserConfigFirstNameRegexKey: 'First Name not valid',
    createUserConfigFirstNameRequiredKey: 'First Name is required',
    createUserConfigFirstNameLengthKey:
      'First Name length too short, must be 2 characters and above',
    createUserConfigFirstNameLengthKey2:
      'First Name length too Long, must not be more than 50 character',
    createUserConfigLastNameLabelKey: 'Last Name',
    createUserConfigLastNamePlaceholderKey: 'Last Name',
    createUserConfigLastNameRegexKey: 'Last Name not valid',
    createUserConfigLastNameRequiredKey: 'Last Name is required',
    createUserConfigLastNameLengthKey:
      'Last Name length too short, must be 2 characters and above',
    createUserConfigLastNameLengthKey2:
      'Last Name length too long, must not be more than 50 character',
    createUserConfigMiddleNameLabelKey: 'Middle Name',
    createUserConfigMiddleNamePlaceholderKey: 'Middle Name',
    createUserConfigMiddleNameRegexKey: 'Middle Name not valid',
    createUserConfigMiddleNameRequiredKey: 'Middle Name is required',
    createUserConfigMiddleNameLengthKey:
      'Middle Name length too short, must be 2 characters and above',
    createUserConfigMiddleNameLengthKey2:
      'Middle Name length too long, must not be more than 50 character',
    createUserConfigEmailLabelKey: 'Email Address',
    createUserConfigEmailPlaceholderKey: 'Email Address',
    createUserConfigEmailRegexKey: 'Email Address not valid',
    createUserConfigEmailRequiredKey: 'Email Address is required',
    createUserConfigEmailLengthKey:
      'Email Address length too short, must be 5 characters and above',
    createUserConfigGenderLabelKey: 'Gender',
    createUserConfigGenderPlaceholderKey: 'Gender',
    createUserConfigGenderOptionKey1: 'Male',
    createUserConfigGenderOptionKey2: 'Female',
    createUserConfigGenderOptionKey3: 'Neither',
    createUserConfigGenderRequiredKey: 'Gender is required',
    createUserConfigPhoneLabelKey: 'Phone Number',
    createUserConfigPhonePlaceholderKey: 'Enter Phone number',
    createUserConfigPhoneRegexKey: 'Phone number not valid',
    createUserConfigPhoneRequiredKey: 'Your phone number is required',
    createUserConfigPhoneLengthKey:
      'Phone number is not valid must be 9 digits long',
    createUserConfigPhoneLengthKey2:
      'Phone number must not be more than 11 digit',
    createUserConfigDateOfBirthLabelKey: 'Date of Birth',
    createUserConfigDateOfBirthPlaceholderKey: 'Date of Birth',
    createUserConfigDateOfBirthRequiredKey: 'Date of Birth is required',
    createUserConfigRoleLabelKey: 'Select Role',
    createUserConfigRolePlaceholderKey: 'Select Role',
    createUserConfigRoleOptionKey1: 'Administrator',
    createUserConfigRoleOptionKey2: 'Agent',
    createUserConfigRoleRequiredKey: 'Role is required',
    createUserConfigMessageLabelKey: 'Invite Message (Optioal)',
    createUserConfigMessagePlaceholderKey: 'Invite Message (Optioal)',
    createUserConfigMessageRequiredKey: 'Message is required',
    header_label: "Get Started",
    header_desc: "Create your free account on the base",
    "email-verification-token-expire": "This email verification link has expired. You can click the button below to resend a new verification link straight to your inbox",
    "email-verification-token-used": "This email verification link has already been used",
    "email-verification-token-invalid": "This email verification link has already been used",
    "email-verification-token-error": "An error occurred while verifying your email. Please click on the button below to resend a new verification link straight to your inbox",
    "email-verification-failed": "EMAIL VERIFICATION FAILED",
    "having-trouble-verifying": "If you’re still having trouble verifying your email",
    "update-email-address": "Update Email Address",
    "we-will-send-email": "We’ll send an email to you with a link to confirm your account",
    "send-confirmation-email": "Send Confirmation Email",
    "email-address": "Email Address",
    "email-verification": "Email Verification",
    "to-confirm-account": "to confirm your account",
    "if-you-get-a-mail": " If you didn’t get a mail, it could be one of the following;",
    "in-your-spam": "The email is in your spam folder",
    "email-had-typo": "The email address you entered had a typo",
    "we-cant-deliver": "We can’t deliver to the email address usually because of corporate firewall or filtering",
    "re-enter-email": "Re-enter your email and try again",
    "resend-email-verification-link": "Resend Email Verification Link",
    "signing-up-for": "Who are you signing up for",
    "myself": "Myself",
    "an-organisation": "An Organisation",
    "continue": "Continue",
  }
}