import {TestBed} from '@angular/core/testing';
import {HttpApiInterceptor} from './http-api.interceptor';
import {HttpErrorResponse, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {LoaderService} from '../../loader/services/loader.service';
import {ToastService} from '../services/toast.service';
import {of, throwError} from 'rxjs';

describe('HttpApiInterceptor', () => {
  let interceptor: HttpApiInterceptor;
  let loaderServiceMock: Partial<LoaderService>;
  let toastServiceMock: Partial<ToastService>;

  beforeEach(() => {
    loaderServiceMock = {
      showLoader: jest.fn(),
      hideLoader: jest.fn()
    };
    toastServiceMock = {
      showToast: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        HttpApiInterceptor,
        {provide: LoaderService, useValue: loaderServiceMock},
        {provide: ToastService, useValue: toastServiceMock}
      ]
    });

    interceptor = TestBed.inject(HttpApiInterceptor);
  });


  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('intercept', () => {

    it('should call showLoader on request and hideLoader on response', () => {
      const next: HttpHandler = {
        handle: () => of(new HttpResponse())
      };
      const request = new HttpRequest('GET', '/test');

      interceptor.intercept(request, next).subscribe();

      expect(loaderServiceMock.showLoader).toHaveBeenCalled();
      expect(loaderServiceMock.hideLoader).toHaveBeenCalled();
    });

    it('should call showToast with correct message for client-side error', () => {
      const errorEvent = new ErrorEvent('Error', {message: 'Client-side error'});
      const errorResponse = new HttpErrorResponse({error: errorEvent});

      const next: HttpHandler = {
        handle: () => throwError(() => errorResponse)
      };
      const request = new HttpRequest('GET', '/test');

      // Handle the observable error
      interceptor.intercept(request, next).subscribe({
        error: () => {
        }
      });

      expect(toastServiceMock.showToast).toHaveBeenCalledWith(`An error occurred: ${errorEvent.message}`);
    });

    it('should call showToast with no response error for status 0', () => {
      const errorResponse = new HttpErrorResponse({status: 0, error: {message: 'Network error'}});

      const next: HttpHandler = {
        handle: () => throwError(() => errorResponse)
      };
      const request = new HttpRequest('GET', '/test');

      // Handle the observable error
      interceptor.intercept(request, next).subscribe({
        error: () => {
        }
      });

      expect(toastServiceMock.showToast).toHaveBeenCalledWith('No response from server');
    });

    it('should call showToast with server error message for server-side error', () => {
      const errorResponse = new HttpErrorResponse({status: 500, statusText: 'Server Error'});

      const next: HttpHandler = {
        handle: () => throwError(() => errorResponse)
      };
      const request = new HttpRequest('GET', '/test');

      // Handle the observable error
      interceptor.intercept(request, next).subscribe({
        error: () => {
        }
      });

      expect(toastServiceMock.showToast).toHaveBeenCalledWith(`Server error occurred: ${errorResponse.status} ${errorResponse.statusText}`);
    });
  })

});
