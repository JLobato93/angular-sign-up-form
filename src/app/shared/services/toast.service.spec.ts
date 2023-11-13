import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {ToastService} from './toast.service';
describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showToast', () => {
    it('should show toast with correct message and hide after specified length', fakeAsync(() => {
      const testMessage = 'Test Message';
      const displayLength = 3000;

      service.showToast(testMessage, displayLength);

      expect(service.getShowStatus().getValue()).toBe(true);
      expect(service.getMessage().getValue()).toBe(testMessage);

      tick(displayLength);

      expect(service.getShowStatus().getValue()).toBe(false);
      expect(service.getMessage().getValue()).toBe('');
    }));
  });
});
