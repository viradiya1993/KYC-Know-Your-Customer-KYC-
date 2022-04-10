
import { NetworkService } from './network.service';
import { HttpParams } from '@angular/common/http';
import { ResponseBody } from './response-body';
import { of } from 'rxjs';
import { API } from './end-points';

describe('NetworkService', () => {
  let service: NetworkService;
  const http = jest.fn();

  beforeEach(() => {
    service = new NetworkService(http as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test: basicPost', () => {
    it('should get the all wrappers', () => {
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
      
      const serviceMock = new NetworkService(httpMock as any);
      const spyNetworkServiceMock = jest.spyOn(serviceMock,'basicPost');
      expect(serviceMock.basicPost).toBeDefined();
      serviceMock.basicPost(API.WRAPPERSERVICES.Listing,mockService,bodyData);
      expect(spyNetworkServiceMock).toHaveBeenCalledWith(API.WRAPPERSERVICES.Listing,mockService,bodyData);
    });
  });

  describe('Test: basicGet', () => {
    it('should get the all Provoders', () => {
      const mockService = new HttpParams()
      .set("page",  "1")
      .set("limit", "10");

      const response = new ResponseBody();
      response.status = 200;
      response.success = true;

      const httpMock = {
        get: jest.fn().mockReturnValue(of(response))
      };
      
      const serviceMock = new NetworkService(httpMock as any);
      const spyNetworkServiceMock = jest.spyOn(serviceMock,'basicGet');
      expect(serviceMock.basicGet).toBeDefined();
      serviceMock.basicGet(API.WRAPPERSERVICES.Listing,mockService);
      expect(spyNetworkServiceMock).toHaveBeenCalledWith(API.WRAPPERSERVICES.Listing,mockService);
    });
  });
});
