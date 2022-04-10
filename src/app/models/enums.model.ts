export enum BiometricType {
  Face = 'true',
  Fingerprint = 'true',
  NoBiometrics = 'false'
}

export enum SnackbarType {
  SUCCESS = 'success',
  DANGER = 'danger',
  DARK = 'dark',
  DEFAULT = 'default',
  PRIMARY = 'primary',
  INFO = 'info',
  WARNING = 'warning',
  SECONDARY = 'secondary',
}

export enum SrmUserTypeEnum {
  PAYER = "PAYER",
  COLLECTOR = "COLLECTOR",
  PRODUCT_ADMIN = "PRODUCT_ADMIN",
}


export enum TransactionStatus {
  Successful = 'Successful',
  Failed = 'Failed',
  Refund = 'Refund'
}

export enum VerificationStatus {
  Pending = 'Pending',
  Verified = 'Verified',
  NotVerified = 'Not Verified'
}

export enum TransactionType {
  Single = 'Single',
  Bulk = 'Bulk',
}

export enum TransactionMode {
  TEST = 'TEST',
  LIVE = 'LIVE',
}

export enum ExportType {
  Pdf = 'Export as PDF doc',
  Excel = 'Export as Excel sheet'
}

export enum Bulk_verifications {
  Completed = 'Completed',
  running = 'running',
}

export enum Bulk_verification_record {
  Successful = 'Successful',
  Failed = 'Failed',
  Pending = 'Pending'
}

export enum Bulk_verifications_status {
  Verified = 'Verified',
  NotVerified = 'Not Verified'
}

export enum SignupTypeEnum {
  INDIVIDUAL = 'INDIVIDUAL',
  ORGANISATION = 'ORGANISATION',
  BOTH = 'BOTH',
}

export enum LINKTYPES {
  SUPPORT = 'SUPPORT',
  ROLE = 'ROLE',
  ADMIN_PANEL = 'ADMIN_PANEL',
  SIGNUP = 'SIGNUP',
  INDIVIDUAL_SIGNUP = 'INDIVIDUAL_SIGNUP',
  OTP = 'OTP',
  FORGET_PASSOWRD = 'FORGET_PASSWORD',
  LOGIN = 'LOGIN',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  PROFILE_DASHBOARD = 'PROFILE',
  RESET_LINK = 'RESET_LINK',
  CREATE_USER = 'CREATE_USER',
  CREATE_USER_ORG = 'CREATE_USER_ORG',
  CREATE_USER_BRANCH = 'CREATE_USER_ORG',
  HOMEPAGE = 'HOMEPAGE',
  RESET_PASSOWRD = 'RESET_PASSOWRD',
  TEMPLATE_DASHBOARD = 'TEMPLATE',
  USER_DASHBOARD = 'USER',
  ORGANISATION_DASHBOARD = 'ORGANISATION',
  WALLET = 'WALLET',
  MANUAL_WALLET = 'MANUAL_WALLET',
  INVOICE_MANAGEMENT = 'INVOICE_MANAGEMENT',
  RECONCILIATION = 'RECONCILIATION',
  CREATE_ORGANIZATION = 'CREATE_ORGANIZATION',
  USER_ACCOUNT_SETTING = 'SETTINGS',
  USER_ACCOUNT_LOGOUT = 'LOGOUT',
  USER_ACCOUNT_HELP = 'HELP',
  TRANSACTION_HISTORY = 'TRANSACTION_HISTORY',
  GUEST_VERIFICATION = "GUEST_VERIFICATION",
  RESET_ON_LOGIN = "RESET_ON_LOGIN"
}

export enum USER_ACCOUNT_SETTINGS {
  SETTINGS = 'SETTINGS',
  LOGOUT = 'LOGOUT',
  HELP = 'HELP',
}

export enum SIGNUP_ROLES {
  INDIVIDUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY',
}

export enum ProfileTypeInterFace {
  USER = 'USER_PROFILE',
  ORGANISATION = 'ORGANISATION_PROFILE',
  SECURITY = 'SECURITY_PROFILE',
}

export enum TransactionFilterType {
  DATE = "DATE",
  STATUS = "STATUS",
  TYPE = "TYPE",
  PAYMENT = "PAYMENT",
  WALLET = "WALLET",
  SEARCH = "SEARCH",
  APPROVAL_STATUS = "APPROVAL_STATUS",
  PAYMENT_STATUS = "PAYMENT_STATUS",
  VALUE_CATEGORY = "VALUE_CATEGORY",
  PRODUCT_SELECTED = "PRODUCT_SELECTED"
}
export interface BulkWrapperService {
  pk: any;
  name: string;
  templateLink: string | null;
  bulkEnabled: boolean;
  isLive: boolean;
}


export interface UserActions {
  wallet: boolean;
  invitedUser: boolean;
  modeTest: boolean;
  modeLive: boolean;
  companyVerified: boolean;
}

export interface BaseOrg {
  baseOrg: string;
  baseProduct: string;
  baseProductUserCategoryCode: string;
  baseProductUserCategoryId: string;
}

export enum ServiceType {
  BIOMETRICS = 'BIOMETRICS',
  BOOLEAN_MATCH = 'BOOLEAN MATCH',
  FULL_DETAILS = 'FULL DETAILS'
}
