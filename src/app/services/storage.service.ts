import { Injectable } from '@angular/core';
import { AppConst } from '../app.constant';
import { IContextData } from '../models/config';
import { PRODUCT_ID } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // tslint:disable-next-line: ban-types
  static setObject(key: string, data: Object): void {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (e) {
      throw new Error('Provided data is not serializable!');
    }
  }

  // tslint:disable-next-line: ban-types
  static getObject(key: string): Object {
    const item = localStorage.getItem(key);
    return item && JSON.parse(item);
  }

  static setItem(key: string, data: string): string {
    localStorage.setItem(key, data);
    return data;
  }

  static getItem(key: string): string {
    const data = localStorage.getItem(key);
    return data;
  }

  getAuthUserToken() {
    return JSON.parse(window.localStorage.getItem('auth-token'));
  }

  setReturnUrl(url) {
    window.localStorage.setItem("setReturnUrl", url);
  }

  
  getSignUpDetails() {
    if (window.localStorage.getItem("signUpDetails")) {
      return JSON.parse(
        window.localStorage.getItem("signUpDetails")
      );
    }
    return null;
  }

  setSignUpDetails(data) {
    window.localStorage.setItem(
      "signUpDetails",
      JSON.stringify(data)
    );
  }

  getProductUserCategoryName(): string | null {
    const contextData = this.getContextData();

    if (contextData.productUserCategoryName) {
      return contextData.productUserCategoryName;
    }
    return null;
  }

  getContextData(): IContextData {
    const data = JSON.parse(window.localStorage.getItem("base-context-data"));

    if (data) {
      return data;
    } else {
      return {};
    }
  }

  getCurrentContextData(): IContextData {
    const data = JSON.parse(window.localStorage.getItem("current-context"));

    if (data) {
      return data;
    } else {
      return {};
    }
  }

  clearSignUpDetails() {
    window.localStorage.removeItem("signUpDetails");
  }

  getOrganisationSignUpDetails() {
    return JSON.parse(
      window.localStorage.getItem("orgSignUpDetails")
    );
  }

  setOrganisationSignUpDetails(data) {
    window.localStorage.setItem(
      "orgSignUpDetails",
      JSON.stringify(data)
    );
  }

  getUserBranch(): string | null {
    const contextData = this.getContextData();

    if (contextData.branch) {
      return contextData.branch;
    }
    return null;
  }

  getUserOrg(): string | null {
    const contextData = this.getContextData();

    if (contextData.organization) {
      return contextData.organization;
    }
    return null;
  }

  getUserType(): string | null {
    const contextData = this.getContextData();

    if (contextData.userType) {
      return contextData.userType;
    }
    return null;
  }

  getProductUserCategoryCode(): string | null {
    const contextData = this.getContextData();

    if (contextData.productUserCategoryBaseCode) {
      return contextData.productUserCategoryBaseCode;
    }
    return null;
  }

  setDefaultTheme(theme = AppConst.DEFAULT_THEME) {
    window.localStorage.setItem('LOCALSTORAGE_APP_DEFAULT_THEME', JSON.stringify(theme));
  }

  clearUserStorage() {
    window.localStorage.clear()
  }

  getDefaultTheme() {
    let theme = window.localStorage.getItem('LOCALSTORAGE_APP_DEFAULT_THEME');
    if (theme) {
      return JSON.parse(theme);
    }
    return null;
  }

  getProductUserUserCategoryId(): string | null {
    const contextData = this.getContextData();

    if (contextData.productUserCategoryBaseId) {
      return contextData.productUserCategoryBaseId;
    }
    return null;
  }

  getTranslationLang(): string | null {
    return window.localStorage.getItem('translation-language');
  }

  logOut(): void {
    window.localStorage.removeItem("user-credential");
    window.localStorage.removeItem("auth-token");
    window.localStorage.removeItem("base-context-data");
    window.localStorage.removeItem("current-category");
    window.localStorage.removeItem("current-context");
    window.localStorage.removeItem("all-category");
    window.localStorage.removeItem("category-context-id");
    window.localStorage.removeItem("userid")
    window.localStorage.removeItem("walletDetails");
    window.localStorage.removeItem("userid");
    window.localStorage.removeItem("is_dismissed_tour");
    window.localStorage.removeItem("signUpDetails");
    window.localStorage.removeItem("app-product-id");
  }

  getFormCaptureExternalLinkHeaders(): any {
    const userToken = this.getAuthUserToken();
    let language = this.getTranslationLang();
    let orgId = this.getUserOrg();
    let branchId = this.getUserBranch();
    let productUserUserCategoryId = this.getProductUserUserCategoryId();
    let productUserUserCategoryCode = this.getProductUserCategoryCode();
    let userType = this.getUserType();
    let productId = PRODUCT_ID;

    return {
      "Accept-Language": `${language || ""}`,
      "Authorization": userToken ? `Bearer ${userToken}` : '',
      "Base-Product": productId || "",
      "Base-Org": orgId || "",
      "Base-Branch": branchId || "",
      "Base-Product-user-category-id": productUserUserCategoryId || "",
      "Base-Product-user-category-code": productUserUserCategoryCode || "",
      "Base-User-type": userType || "",
    };
  }

  getUserUserCredential(): any {
    const credential = window.localStorage.getItem("user-credential");
    if (credential) {
      return JSON.parse(credential);
    } else {
      return null;
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  constructor() {
    if (typeof Storage === 'undefined') {
      throw new Error('StorageService: Local storage is not supported');
    }
  }
}
