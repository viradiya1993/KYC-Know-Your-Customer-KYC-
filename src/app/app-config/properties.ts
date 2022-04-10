import { BaseProperties } from './base-properties';

export class Properties {
  public static SETTINGS_API_ENDPOINT =
    BaseProperties.BASE_URL +
    '/base-test/resources/test/get-content/base-settings.json';

  public static GET_CONFIG_API_ENDPOINT =
    BaseProperties.BASE_URL + '/base-test/resources/test/get-content/';

  public static SAVE_CONFIG_ENDPOINT = BaseProperties.BASE_URL + '/form-config-base/config/save';

  public static GET_CONFIG_BY_TYPE_ENDPOINT =
    BaseProperties.BASE_URL + '/form-config-base/config/public/published';

  public static GET_ALL_PRODUCT_FORM_TYPE_ENDPOINT =
    BaseProperties.BASE_URL + '/form-config-base/config/form-config-types';

  public static DOWNLOAD_BULK_USER_CREATION_TEMPLATE_ENDPOINT =
    BaseProperties.BASE_URL + '/user-creation-base/bulk-users/download';

  public static UPLOAD_BULK_USER_CREATION_TEMPLATE_ENDPOINT =
    BaseProperties.BASE_URL + '/user-creation-base/bulk-users/upload';

  public static DOWNLOAD_BULK_USER_CREATION_REPORT_ENDPOINT =
    BaseProperties.BASE_URL +
    '/user-creation-base/bulk-users/download-report';

  public static CREATE_USER_ENDPOINT =
    BaseProperties.BASE_URL + '/user-creation-base/users/create';

  public static SIGNUP_ENDPOINT =
    BaseProperties.BASE_URL + '/user-creation-base/users/public/sign-up';

  public static EDIT_USER_ENDPOINT =
    BaseProperties.BASE_URL + '/user-creation-base/users/update';

  public static EDIT_USER_PROFILE_ENDPOINT =
    BaseProperties.BASE_URL + '/user-creation-base/users/update-profile';

  public static GET_COMPONENT_SETTING_ENDPOINT =
    BaseProperties.BASE_URL + '/settings-base/settings/find';

  public static ORGANISATION_SIGNUP_ENDPOINT =
    BaseProperties.BASE_URL + '/user-creation-base/organization/sign-up';

  public static VERIFY_ORGANISATION_ENDPOINT =
    'https://stagingcloudapp.verified.ng/rc';

  public static CREATE_ORGANISATION_ENDPOINT =
    BaseProperties.BASE_URL + '/user-creation-base/organization/create';

  public static UPDATE_ORGANISATION_ENDPOINT =
    BaseProperties.BASE_URL + '/user-creation-base/organization/update';

  public static UPDATE_ORGANISATION_PROFILE_ENDPOINT =
    BaseProperties.BASE_URL + '/user-creation-base/organization/update-profile';

  public static BILLABLE_INFO =
    BaseProperties.BASE_URL + '/user-creation-base/billing/billable-info';

    public static BILLABLE_PRODUCT =
    BaseProperties.BASE_URL + '/user-creation-base/billing/products';

  public static CREATE_BRANCH_ENDPOINT =
    BaseProperties.BASE_URL + '/api/v1/base/branch-management/branches';

  public static EDIT_BRANCH_ENDPOINT =
    BaseProperties.BASE_URL + '/api/v1/base/branch-management/branches';

  public static ORGANISATION_LIST_ENDPOINT=BaseProperties.BASE_URL+'/user-creation-base/organization/list';

  public static BRANCH_LIST_ENDPOINT=BaseProperties.BASE_URL+'/api/v1/base/branch-management/branches/list';

  public static CHECK_USERS_FOR_UNIQUENESS=BaseProperties.BASE_URL+'/user-creation-base/users/public/unique-field-check';

  public static CHECK_ORGANIZATIONS_FOR_UNIQUENESS=BaseProperties.BASE_URL+'/user-creation-base/organization/public/unique-field-check';

  public static ORGANISATION_SIGNUP_UPDATED = BaseProperties.BASE_URL+'/user-creation-base/organization/public/create-updated';

  public static GET_USER_ORG_PROFILE =
    BaseProperties.BASE_URL +
    '/user-creation-base/organization/organization-disable-info';

  public static GET_USER_PROFILE =
    BaseProperties.BASE_URL +
    '/user-creation-base/users/user-disable-info';

  public static CHANGE_PASSWORD_ENDPOINT =
    BaseProperties.BASE_URL + "/login-base/login-resources/change-password";

  public static CHANGE_PASSWORD_NO_TOKEN_ENDPOINT =
    BaseProperties.BASE_URL +
    "/login-base/login-resources/change-password-no-token";

  public static GET_USER_CONTEXT_ENDPOINT =
    BaseProperties.BASE_URL + "/srm-services/srm-user/user-categories";

  public static ENCODE_CREDENTIAL_ENDPOINT =
    BaseProperties.BASE_URL + '/api/v1/base/user-management/utils/encode-jwt';

    public static RETRIEVE_WHITE_LABEL=BaseProperties.BASE_URL+"/srm-services/label/retrieve-label";
  public static GET_SRM_USER_CONTEXT_ID =
    BaseProperties.BASE_URL + '/srm-services/srm-user/srm-id';
  
    public static RETRIEVE_ORG_THEME_FROM_URL = BaseProperties.BASE_URL+"/user-creation-base/theme/public/org-theme";
}
