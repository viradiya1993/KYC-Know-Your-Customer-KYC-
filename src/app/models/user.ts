import { SnackbarType } from "./enums.model";

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
  