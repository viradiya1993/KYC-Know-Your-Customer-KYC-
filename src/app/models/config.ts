import { SnackbarType } from "./enums.model";

export interface LandingPageConfig {
  headers: Array<{ key: string }>;
  images: Array<string>;
  texts: Array<{ key: string }>;
}

export interface IInput {
  type: string;
  subtype: string;
  name: string;
  aria: string;
  label: { key: string; defaultValue: string };
  placeholder: { key: string; defaultValue: string };
  minLength?: number;
  maxLength?: number;
  visibility?: boolean;
  regexExpression?: string;
  regexMessage?: { key: string; defaultValue: string };
  requiredMessage?: { key: string; defaultValue: string };
  minimumLengthMessage?: { key: string; defaultValue: string };
  maximumLengthMessage?: { key: string; defaultValue: string };
  required?: boolean;
  options?: Array<{ key: string; defaultValue: string }>;
}

export interface IContextData {
  productUserCategoryBaseId?: string;
  productUserCategoryBaseCode?: string;
  productUserCategoryName?:string;
  product?: string;
  branch?: string;
  organization?: string;
  userType?: string;
  privileges?: Array<string>
}

export enum UserCategoryEnum {
  INDIVIDUAL_PAYER = "INDIVIDUAL_PAYER",
  ORGANIZATION_PAYER = "ORGANIZATION_PAYER",
  ORGANIZATION_COLLECTOR = "ORGANIZATION_COLLECTOR",
  PRODUCT_ADMIN = "PRODUCT_ADMIN",
  GUEST = "GUEST",
}

export enum SrmUserTypeEnum {
  PAYER = "PAYER",
  COLLECTOR = "COLLECTOR",
  PRODUCT_ADMIN = "PRODUCT_ADMIN",
}
export interface CustomDivElement extends HTMLDivElement {
  hide?: Function;
}

export interface IToastOptions {
  animationIn?: string;
  animationOut?: string;
  image?: string;
  important?: string;
  icon?: string;
  text?: string;
  callbackOk?: Function;
  callbackCancel?: Function;
  buttonOk?: string;
  buttonCancel?: string;
  duration?: number;
  rounded?: boolean;
  type?: SnackbarType;
  classes?: string;
}