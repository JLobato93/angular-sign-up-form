import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
  declarations: [
    SignUpFormComponent
  ],
  exports: [
    SignUpFormComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        SignUpRoutingModule,
    ]
})
export class SignUpModule {}
