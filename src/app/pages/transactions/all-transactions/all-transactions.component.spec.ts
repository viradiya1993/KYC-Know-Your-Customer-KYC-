
import { AllTransactionsComponent } from './all-transactions.component';
import { HttpParams } from '@angular/common/http';
import { ResponseBody } from 'src/app/services/response-body';

describe('AllTransactionsComponent', () => {
  let component: AllTransactionsComponent;
  let wrapperServiceMock:any;

  beforeEach(async () => {
    wrapperServiceMock = {
      getAllTrasactions: jest.fn(),
      getAllTrasactionFilterService : jest.fn()
    }
    component = new AllTransactionsComponent(wrapperServiceMock);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Test: getAllTrasactionsHistory', () => {
    it('should get the all Transactions By Filter', () => {
      const params = new HttpParams()
      .set("page", "1")
      .set("limit", "10")
      const bodyData = {
        userId: 6524,
        verificationStatus: "Successful",
        transactionStatus: "Pending",
        transactionType: "single",
        serviceUsed: "Seamfix FRSC Service",
        /* fromDate: this.filterTransaction.fromDate,
        toDate:  this.filterTransaction.toDate, */
        search:  "v"
      };
      const data = {
        transactions: {
          serviceAnalytics: {},
          totalCounts: "10589",
          totalSuccessCount: "149",
          transactions: {}
        }
      }
      const response = new ResponseBody();
      response.data = data;
      response.status = 200;
      response.success = true;

      const component = new AllTransactionsComponent(wrapperServiceMock);
      const spywrapperServiceMock = jest.spyOn(wrapperServiceMock,'getAllTrasactions').mockReturnValue(response);
      expect(component.getAllTrasactionsHistory).toBeDefined();
      expect(wrapperServiceMock.getAllTrasactions(params,bodyData)).toBe(response);
      expect(spywrapperServiceMock).toHaveBeenCalledWith(params,bodyData);
    })
  })

  describe('Test: getAllTrasactionFilter', () => {
    it('should get the all Transactions service By Filter', () => {
      const params = new HttpParams()
      const bodyData = {
        userId: 6524,
      }
      const data = {
        transactionService: {
          0: {pk: "120", serviceUsed: "CAC Verification Service"},
          1: {pk: "940", serviceUsed: "BVN Full Details Service"},
          2: {pk: "955", serviceUsed: "Bank Account Validation Service"},
          3: {pk: "960", serviceUsed: "Seamfix BVN Service"},
          4: {pk: "962", serviceUsed: "Seamfix NIN service"},
          5: {pk: "963", serviceUsed: "Seamfix FRSC Service"},
          6: {pk: "964", serviceUsed: "Seamfix Address Verification"},
          7: {pk: "970", serviceUsed: "Seamfix VIN Service"},
          8: {pk: "980", serviceUsed: "International Passport"}
        }
      }
      const response = new ResponseBody();
      response.data = data;
      response.status = 200;
      response.success = true;

      const component = new AllTransactionsComponent(wrapperServiceMock);
      const spywrapperServiceMock = jest.spyOn(wrapperServiceMock,'getAllTrasactionFilterService').mockReturnValue(response);
      expect(component.getAllTrasactionsHistory).toBeDefined();
      expect(wrapperServiceMock.getAllTrasactionFilterService(params,bodyData)).toBe(response);
      expect(spywrapperServiceMock).toHaveBeenCalledWith(params,bodyData);
    })
  })
});
