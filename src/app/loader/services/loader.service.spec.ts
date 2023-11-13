import {TestBed} from '@angular/core/testing';

import {LoaderService} from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showLoader', () => {
    it('should set isLoading to true when showLoader is called', (done) => {
      service.showLoader();
      service.isLoading$.subscribe(value => {
        expect(value).toBe(true);
        done();
      });
    });
  })

  describe('hideLoader', () => {
    it('should set isLoading to false when hideLoader is called', (done) => {
      service.hideLoader();
      service.isLoading$.subscribe(value => {
        expect(value).toBe(false);
        done();
      });
    });
  });
});
