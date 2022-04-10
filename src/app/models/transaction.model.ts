export interface PeriodicElementTransaction {
    pk: number;
    transactionId: string | null;
    serviceUsed: string | null;
    transactionType: string | null;
    bulkId: string | null;
    verificationStatus: string | null;
    amount: number;
    transactionStatus: string | null;
    paymentTime: string | null;
    userName: string | null;
    responseTime: string | null;
    failureReason: string | null;
}

