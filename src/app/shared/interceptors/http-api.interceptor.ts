import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, finalize, throwError} from 'rxjs';
import {ToastService} from "../services/toast.service";
import {LoaderService} from "../../loader/services/loader.service";

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService, private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loaderService.showLoader();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hideLoader()),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  /**
   * Normally a logging service is used, but for this simple example we just show a toast and log to console
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      this.toastService.showToast(`An error occurred: ${error.error.message}`);
    } else if (error.status === 0) {
      // No response error
      this.toastService.showToast('No response from server');
    } else {
      // Server-side error
      this.toastService.showToast(`Server error occurred: ${error.status} ${error.statusText}`);
      console.log(error);
    }
    console.error('Error from error interceptor:', error);
    return throwError(() => error);
  }
}
