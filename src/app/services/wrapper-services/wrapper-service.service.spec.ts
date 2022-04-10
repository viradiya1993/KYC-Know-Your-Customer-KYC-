import { WrapperServiceService } from './wrapper-service.service';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { ResponseBody } from '../response-body';
import { HttpParams } from '@angular/common/http';
import { NetworkService } from '../network.service';
import { API } from '../end-points';

describe('WrapperServiceService', () => {
  let service: WrapperServiceService;
  let networkServiceMock: any;
  const data = {
      "apiDocUrl": "https://verifiedng.readme.io/docs/rc",
      "biometricEnabled": true, 
      "charge": "200.00", 
      "clientkeys": [{
        "clientFk": {"pk": "1020"},
        "key": "m$Ba0_yWfn0VtH'i", "pk": "1077"
      }],
      "description": "This service allows customers verify a company Certificate of Incorporation", 
      "failureBaseCharge": "150.00", 
      "lastInvocation": "2020-07-19T05:30:04.819Z", 
      "name": "CAC Verification Service", 
      "pk": "120", 
      "published": false, 
      "successBaseCharge": "300.00", 
      "wrapperRef": "SFX|KYC|RC|0001", 
      "wrapperServiceProviders": []
  }

  const http = jest.fn();

  beforeEach(() => {
    networkServiceMock = {
      basicPost: jest.fn(),
      basicGet: jest.fn()
    };

    service = new WrapperServiceService(
      networkServiceMock,
      http as any
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test: GetAllWrapperServices', () => {
    it('should get the all active the wrapper services', () => {
      const mockService = new HttpParams()
      .set("page",  "1")
      .set("limit", "10");

      const bodyData = {
        biometricEnabled: true,
        name: null,
        clientId: 1020,
        verificationServiceProviderId: null
      }
      
      const response = new ResponseBody();
      response.status = 200;
      response.success = true;

      const httpMock = {
        post: jest.fn().mockReturnValue(of(response))
      };
      
      const serviceMock = new WrapperServiceService(networkServiceMock, httpMock as any);
      const spyNetworkServiceMock = jest.spyOn(networkServiceMock,'basicPost').mockReturnValue(response);
      expect(serviceMock.getAllWrapperServices).toBeDefined();
      expect(networkServiceMock.basicPost(API.WRAPPERSERVICES.Listing,mockService,bodyData)).toBe(response);
      expect(spyNetworkServiceMock).toHaveBeenCalledWith(API.WRAPPERSERVICES.Listing,mockService,bodyData);
    });
  });

  
  describe('Test: getallIdProvider', () => {
    it('should get the all Provider', () => {
      const mockService = new HttpParams()
      .set("page",  "1")
      .set("limit", "10");

      const response = new ResponseBody();
      response.data = data;
      response.status = 200;
      response.success = true;

      const httpMock = {
        get: jest.fn().mockReturnValue(of(response))
      };
      const serviceMock = new WrapperServiceService(networkServiceMock, httpMock as any);
      const spyNetworkServiceMock = jest.spyOn(networkServiceMock,'basicGet').mockReturnValue(response);
      expect(serviceMock.getallIdProvider).toBeDefined();
      expect(networkServiceMock.basicGet(API.WRAPPERSERVICES.AllProviders,mockService)).toBe(response);
      expect(spyNetworkServiceMock).toHaveBeenCalledWith(API.WRAPPERSERVICES.AllProviders,mockService);
    });
  });
});
