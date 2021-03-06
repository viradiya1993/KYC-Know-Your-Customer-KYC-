export class AppConst {
    public static apiUrl = 'https://verifiedng.readme.io/v3.0/'
    public static pageSize: any = 50;
    public static PageLimits = {
        Limits: [50, 100, 500, 1000]
    };
    public static DEFAULT_THEME = {
        'primary-color': '#15C5F8',
        'base-font': 'Muli',
        'logo': `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`
    };

    public static PRIVILAGE_CONSATNT = {
        VIEW_DASHBOARD: 'VIEW_DASHBOARD',
        VIEW_BILLING_PAGE: 'VIEW_BILLING_PAGE',
        VIEW_TRANSACTIONS_PAGE: 'VIEW_TRANSACTIONS_PAGE',
        VIEW_SERVICES_PAGE: 'VIEW_SERVICES_PAGE',
        USE_SERVICE_LIVE: 'USE_SERVICE_LIVE',
        USE_SERVICE_TEST: 'USE_SERVICE_TEST',
        SWITCH_TO_LIVE: 'SWITCH_TO_LIVE',
        VIEW_BULK_VERIFICATION_PAGE: 'VIEW_BULK_VERIFICATION_PAGE',
        VIEW_ROLES_PAGE: 'VIEW_ROLES_PAGE',
        USE_BULK: 'USE_BULK',
        TOP_UP: 'TOP_UP',
        CAG: "CAG",
        CEU: "CEU",
        CREATE_USERS: "CREATE_USERS",
        UAU: "UAU",
        UMM: "UMM",
        URP: "URP",
        RMM:"RMM",
    };

    public static BULK_FILE_UPLOAD_ALLOWED_EXTE = ['.xls', '.xlsx'];
    public static VERIFICATIONRTYPES = {
        BVN_FUll_DETAILS: 'BVN-FULL-DETAILS',
        NIN_SEARCH: 'NIN-SEARCH',
        BVN_VERIFICATION: 'BVN-VERIFICATION',
        NIN_DEMOGRAPHIC_SEARCH: 'NIN-DEMOGRAPHIC-SEARCH',
        NIN_FINGER_SEARCH: 'NIN-FINGER-SEARCH',
        NIN_PHONE_SEARCH: 'NIN-PHONE-SEARCH',
        BVN_BOOLEAN_MATCH: 'BVN-BOOLEAN-MATCH',
        RC_VERIFICATION: 'RC-VERIFICATION',
    };
    public static VerificationStatus = {
        VERIFIED: 'VERIFIED',
        NOT_VERIFIED: 'NOT_VERIFIED',
        NOT_VERIFIEDRMSP: 'NOT VERIFIED',
        FAILED: 'FAILED',
        PENDING: 'PENDING'
    };
    public static ActivicationStatus = {
        APPROVED: 'APPROVED'
    };
    public static ServiceType = {
        BIOMETRICS: 'BIOMETRICS'
    };
}
