export const TABLEDATA: any = {
  headers: [
    {
      columnText: "#",
      i18nKey: "serial-number-key",
      columnKey: "serialNumber",
      columnType: "TEXT",
    },
    {
      columnText: "Service Name",
      i18nKey: "service-name-key",
      columnKey: "serviceName",
      columnType: "TEXT",
    },
    {
      columnText: "Provider",
      i18nKey: "provider-key",
      columnKey: "provider",
      columnType: "TEXT",
    },
    {
      columnText: "Description",
      i18nKey: "description-key",
      columnKey: "description",
      columnType: "TEXT",
    },
    {
      columnText: "Current Band",
      i18nKey: "current-band-key",
      columnKey: "currentBand",
      columnType: "TEXT",
    },

    {
      columnText: "Unit Cost",
      columnKey: "unitCost",
      columnType: "TEXT",
      i18nKey: "unit-cost-key",
    },
    {
      columnText: "Biometric Enabled",
      columnKey: "biometricEnabled",
      columnType: "TEXT",
      i18nKey: "biometric-enabled-key",
    },
    {
      columnText: "",
      columnKey: "extraInfo",
      columnType: "MORE_VERT",
    },
  ],
  rows: [
    {
      id: "XXX1",
      rowItems: [
        {
          columnKey: "serialNumber",
          value: "1",
          i18nKey: "serial-number-key",
        },
        {
          columnKey: "serviceName",
          value: "BVN Validity Serice",
          i18nKey: "service-name-key",
        },
        {
          columnKey: "provider",
          value: "Provider one",
          i18nKey: "provider-key",
        },
        {
          columnKey: "description",
          value: "lorem ipsum",
          i18nKey: "description-key",
        },
        {
          columnKey: "CurrentBand",
          value: "More band is the issue",
          i18nKey: "current-band-key",
        },
        {
          columnKey: "unitCost",
          value: 20,
          i18nKey: "unit-cost-key",
        },
        {
          columnKey: "biometricEnabled",
          value: "Yes",
          i18nKey: "biometric-enabled-key",
        },
        {
          columnKey: "extraInfo",
          dropDownItems: [
            {
              displayText: "View banded cost",
              i18nKey: "view-banded-cost-key",
              eventKey: "VBC",
            },
            {
              displayText: "View Requests",
              eventKey: "VR",
              i18nKey: "view-requests-key",
            },
          ],
        },
      ],
    },
    {
      id: "XXX2",
      rowItems: [
        {
          columnKey: "serialNumber",
          value: "2",
          i18nKey: "serial-number-key",
        },
        {
          columnKey: "serviceName",
          value: "Service two",
          i18nKey: "service-name-key",
        },
        {
          columnKey: "provider",
          value: "Provider two",
          i18nKey: "provider-key",
        },
        {
          columnKey: "description",
          value: "lorem ipsum two",
          i18nKey: "description-key",
        },
        {
          columnKey: "CurrentBand",
          value: "More band is the issue two",
          i18nKey: "current-band-key",
        },
        {
          columnKey: "unitCost",
          value: 40,
          i18nKey: "unit-cost-key",
        },
        {
          columnKey: "biometricEnabled",
          value: "No",
          i18nKey: "biometric-enabled-key",
        },
        {
          columnKey: "extraInfo",
          dropDownItems: [
            {
              displayText: "View banded cost",
              i18nKey: "view-banded-cost-key",
              eventKey: "VBC",
            },
            {
              displayText: "View Requests",
              eventKey: "VR",
              i18nKey: "view-requests-key",
            },
          ],
        },
      ],
    },
    {
      id: "XXX3",
      rowItems: [
        {
          columnKey: "serialNumber",
          value: "3",
          i18nKey: "serial-number-key",
        },
        {
          columnKey: "serviceName",
          value: "Service two",
          i18nKey: "service-name-key",
        },
        {
          columnKey: "provider",
          value: "Provider two",
          i18nKey: "provider-key",
        },
        {
          columnKey: "description",
          value: "lorem ipsum two",
          i18nKey: "description-key",
        },
        {
          columnKey: "CurrentBand",
          value: "More band is the issue two",
          i18nKey: "current-band-key",
        },
        {
          columnKey: "unitCost",
          value: 40,
          i18nKey: "unit-cost-key",
        },
        {
          columnKey: "biometricEnabled",
          value: "No",
          i18nKey: "biometric-enabled-key",
        },
        {
          columnKey: "extraInfo",
          dropDownItems: [
            {
              displayText: "View banded cost",
              i18nKey: "view-banded-cost-key",
              eventKey: "VBC",
            },
            {
              displayText: "View Requests",
              eventKey: "VR",
              i18nKey: "view-requests-key",
            },
          ],
        },
      ],
    },
  ],
};

export const WALLET_TABLEDATA: any = {
  headers: [
    {
      columnText: "#",
      i18nKey: "serial-number-key",
      columnKey: "serialNumber",
      columnType: "TEXT",
    },
    {
      columnText: "Transaction id",
      i18nKey: "transaction-id",
      columnKey: "transactionId",
      columnType: "TEXT",
    },
    {
      columnText: "Method",
      i18nKey: "method",
      columnKey: "method",
      columnType: "TEXT",
    },
    {
      columnText: "Amount",
      i18nKey: "amount",
      columnKey: "amount",
      columnType: "TEXT",
    },
    {
      columnText: "Top up status",
      i18nKey: "top-up-status",
      columnKey: "topUpStatus",
      columnType: "STATUS",
    },

    {
      columnText: "Transaction receipt",
      i18nKey: "transaction-receipt",
      columnKey: "transactionReceipt",
      columnType: "TEXT",
    },
    {
      columnText: "Payment Time",
      columnKey: "paymentTime",
      columnType: "TEXT",
      i18nKey: "payment-time",
    }
  ],
  rows: [
    {
      id: "XXX1",
      rowItems: [
        {
          columnKey: "serialNumber",
          value: "2",
          i18nKey: "serial-number-key",
        },
        {
          columnKey: "transactionId",
          value: "Verified1028",
          i18nKey: "transaction-id",
        },
        {
          columnKey: "method",
          value: "Card ****… 3454",
          i18nKey: "method",
        },
        {
          columnKey: "amount",
          value: "₦ 500",
          i18nKey: "amount",
        },
        {
          columnKey: "topUpStatus",
          value: "Declined",
          color: "#EA0C0C",
          bgColor: "#FDE0E0",
          i18nKey: "top-up-status",
        },
        {
          columnKey: "transactionReceipt",
          value: "ISEE32",
          i18nKey: "transaction-receipt",
        },
        {
          columnKey: "paymentTime",
          value: "Today 08:50 AM",
          i18nKey: "payment-time",
        },
      ],
    },
    {
      id: "XXX2",
      rowItems: [
        {
          columnKey: "serialNumber",
          value: "2",
          i18nKey: "serial-number-key",
        },
        {
          columnKey: "transactionId",
          value: "Verified1028",
          i18nKey: "transaction-id",
        },
        {
          columnKey: "method",
          value: "Card ****… 3454",
          i18nKey: "method",
        },
        {
          columnKey: "amount",
          value: "₦ 500",
          i18nKey: "amount",
        },
        {
          columnKey: "topUpStatus",
          value: "Declined",
          color: "#EA0C0C",
          bgColor: "#FDE0E0",
          i18nKey: "top-up-status",
        },
        {
          columnKey: "transactionReceipt",
          value: "ISEE32",
          i18nKey: "transaction-receipt",
        },
        {
          columnKey: "paymentTime",
          value: "Today 08:50 AM",
          i18nKey: "payment-time",
        },
      ],
    },
    {
      id: "XXX3",
      rowItems: [
        {
          columnKey: "serialNumber",
          value: "2",
          i18nKey: "serial-number-key",
        },
        {
          columnKey: "transactionId",
          value: "Verified1028",
          i18nKey: "transaction-id",
        },
        {
          columnKey: "method",
          value: "Card ****… 3454",
          i18nKey: "method",
        },
        {
          columnKey: "amount",
          value: "₦ 500",
          i18nKey: "amount",
        },
        {
          columnKey: "topUpStatus",
          value: "Successful",
          color: "#1DC9B7",
          bgColor: "#E0FDEA",
          i18nKey: "top-up-status",
        },
        {
          columnKey: "transactionReceipt",
          value: "ISEE32",
          i18nKey: "transaction-receipt",
        },
        {
          columnKey: "paymentTime",
          value: "Today 08:50 AM",
          i18nKey: "payment-time",
        },
      ],
    },
  ],
};

export const REQUEST_DATA = [{ price: 200, rangeOfRequest: "0 - 50,000" }, { price: 500, rangeOfRequest: "50,001 - 100,000" }, { price: 1000, rangeOfRequest: "100,001 - 500,000" }]