
import { ServicesComponent } from './services.component';
import { ServiceDetailsPopupComponent } from './service-details-popup/service-details-popup.component';
import { GoLivePopupComponent } from './go-live-popup/go-live-popup.component';
import { UserServicePopupComponent } from './user-service-popup/user-service-popup.component';

describe('ServicesComponent', () => {
  let fixture: ServicesComponent;
  let wrapperServiceMock: any;
  let dialogMock: any;
  const overlayMock: any = jest.fn();

  beforeEach(async () => {
    wrapperServiceMock = {
      GetAllWrapperServices: jest.fn()
    };
    dialogMock = {
      open: jest.fn()
    };
    fixture = new ServicesComponent(wrapperServiceMock, dialogMock, overlayMock);
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });
  
  describe('Test openDetailsDialog',() =>{
    it('should call open Detail Dialog', () =>  {
      const dialogSpy = jest.spyOn(fixture.dialog, 'open');
      fixture.openDetailsDialog();
      expect(dialogSpy).toHaveBeenCalledWith(ServiceDetailsPopupComponent, {
        panelClass: 'service-detail-popup',
      })
    });
  })

  describe('Test openGoLiveDialog',() =>{
    it('should call open GoLive Dialog', () =>  {
      const dialogSpy = jest.spyOn(fixture.dialog, 'open');
      fixture.openGoLiveDialog();
      expect(dialogSpy).toHaveBeenCalledWith(GoLivePopupComponent, {
        panelClass: 'sm-popup',
      })
    });
  })

  describe('Test openUseServiceDialog',() =>{
    it('should call open Service Dialog', () =>  {
      const dialogSpy = jest.spyOn(fixture.dialog, 'open');
      fixture.openUseServiceDialog();
      expect(dialogSpy).toHaveBeenCalledWith(UserServicePopupComponent, {
        panelClass: 'service-detail-popup',
      })
    });
  })
});
