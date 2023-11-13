import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  showToast(message: string, length: number = 3000): void {
    this.message$.next(message);
    this.show$.next(true);

    setTimeout(() => {
      this.show$.next(false);
      this.message$.next('');
    }, length);
  }

  getMessage(): BehaviorSubject<string> {
    return this.message$;
  }

  getShowStatus(): BehaviorSubject<boolean> {
    return this.show$;
  }
}
