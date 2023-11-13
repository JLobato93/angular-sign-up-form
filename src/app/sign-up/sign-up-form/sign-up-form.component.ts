import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SignUpApiService} from "../services/sign-up-api.service";
import {ValidationService} from "../services/validation.service";
import { Subscription} from "rxjs";
import {SignUpInformation} from "../../shared/model/sign-up.model";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpFormComponent implements OnDestroy {
  // Validate whole form for password errors so when firstName or lastName changes, the password errors are updated
  signUpForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, this.validationService.validateEmail.bind(this)]],
    password: ['', Validators.required]
  }, {validators:  this.validationService.validatePassword()});
  subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private signUpApiService: SignUpApiService,
    public validationService: ValidationService
  ) {}

  onSubmit() {
    const signUpInformation: SignUpInformation = this.signUpForm.value;
    if (this.signUpForm.valid) {
      this.subscription = this.signUpApiService.registerUser(signUpInformation).subscribe({
          next: () => {
            this.signUpForm.reset();
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
