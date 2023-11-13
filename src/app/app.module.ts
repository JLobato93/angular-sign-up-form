import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SignUpModule} from "./sign-up/sign-up.module";
import {HttpApiInterceptor} from "./shared/interceptors/http-api.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {LoaderModule} from "./loader/loader.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        SignUpModule,
        AppRoutingModule,
        LoaderModule
    ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpApiInterceptor,
    multi: true
  }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
