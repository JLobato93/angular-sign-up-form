import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastNotificationComponent} from "./toast-notification/toast-notification.component";
import {LoaderModule} from "../loader/loader.module";
@NgModule({
  declarations: [ToastNotificationComponent],
  imports: [
    CommonModule,
    LoaderModule
  ],
  exports: [ToastNotificationComponent]
})
export class SharedModule {}
