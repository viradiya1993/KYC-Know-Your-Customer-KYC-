export class API {
    public static PAGE_SIZE = 10;
    public static WRAPPERSERVICES = {
        Listing: 'wrapper',
        AllProviders: 'wrapper/verificationservice',
        ChangeLiveOrTestMode: 'wrapper/updateLiveTestValue'
    };

    public static TRASACTIONS = {
        Listing: 'transaction',
        ServiceFilter: 'transaction/wrapperservice',
        s3DownloadReqRes: 'transaction/S3DownloadRequestResponse'
    };

    public static BULKVERIFICATION = {
        Listing: 'bulk-verification',
        BulkTrasaction: 'bulk-verification/bulkWiseTransaction',
        BulkCardStatistics: 'bulk-verification/transactionStatistics',
        BulkWrapperServices: 'bulk-verification/bulkWrapperService',
        DownloadTemplate: 'bulk-verification/S3Download',
        UploadBulk: 'bulk-verification/verify-bulk-records'
    };
    public static AUTH = {
        Logout: 'verified/kyc/logout',
        UserDetails: 'verified/kyc/userDetails'
    };

    public static BILLING = {
        Listing: "billing/cards",
        Details: 'billing/customerBillingDetails',
        BandDetails: "billing/billingBandDetails",
        WrapperService: "billing/wrapperservice"
    }
    public static DASHBOARD = {
        Listing: 'dashboard/cards',
        Barcard: 'dashboard/barcard/filter',
        Onboarding: 'dashboard/checkuserAction'
    };

    public static Wallet = {
        Creation: 'wrapper/createWallet',
        WalletDetails: 'wrapper/walletDetails'
    };

    public static TourDismiss = {
        dismisstour: 'verified/kyc/user/tourDismiss'
    }
}
