
import { TransactionsDashboardComponent } from './transactions-dashboard.component';
import { HttpParams } from '@angular/common/http';
import { ResponseBody } from 'src/app/services/response-body';
import { of } from 'rxjs';

describe('TransactionsDashboardComponent', () => {
  let component: TransactionsDashboardComponent;
  let wrapperServiceMock: any;
  beforeEach(async () => {
      wrapperServiceMock = {
        getAllTrasactions : jest.fn()
      }
      component = new TransactionsDashboardComponent(wrapperServiceMock);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test: getAllTransactions', () => {
    it('should get the all Transactions', () => {
      const params = new HttpParams()
      .set("page",  "1")
      .set("limit", "10");

      const bodyData = {
        userId: 6524,
        fromDate: "2020-07-19T05:30:04.819Z",
        toDate:  "2020-07-25T05:30:04.819Z"
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
      
      const component = new TransactionsDashboardComponent(wrapperServiceMock);
      const spywrapperServiceMock = jest.spyOn(wrapperServiceMock,'getAllTrasactions').mockReturnValue(response);
      expect(component.getAllTransactions).toBeDefined();
      expect(wrapperServiceMock.getAllTrasactions(params,bodyData)).toBe(response);
      expect(spywrapperServiceMock).toHaveBeenCalledWith(params,bodyData);
    });
  });
});
