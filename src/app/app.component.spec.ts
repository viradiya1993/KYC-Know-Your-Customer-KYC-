
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: AppComponent;
  let ScrollTopService;
  let LanguageService;
  beforeEach(async () => {
    ScrollTopService = {
      submitScrollService: jest.fn()
    };

    LanguageService = {
      setLangugeService: jest.fn()
    };

    fixture = new AppComponent(
      ScrollTopService,
      LanguageService,
    );
  });
  describe('Setup Component', () => {
    it('initalized the notification', () => {
      fixture.isVerifyBusinessOpen = true;
      expect(fixture.isVerifyBusinessOpen).toEqual(true);
    });
  });
});
