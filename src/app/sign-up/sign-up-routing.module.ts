import {NgModule} from '@angular/core';
import {SignUpFormComponent} from "./sign-up-form/sign-up-form.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: SignUpFormComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule {}
