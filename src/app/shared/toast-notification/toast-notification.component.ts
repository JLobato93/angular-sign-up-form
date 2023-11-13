import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ToastService} from "../services/toast.service";
import {BehaviorSubject} from "rxjs";
@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastNotificationComponent {
  message$: BehaviorSubject<string> = this.toastService.getMessage();
  show$: BehaviorSubject<boolean> = this.toastService.getShowStatus();

  constructor(private toastService: ToastService) {}
}
