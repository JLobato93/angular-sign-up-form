import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';

import {SignUpFormComponent} from './sign-up-form.component';
import {SignUpApiService} from '../services/sign-up-api.service';
import {SharedModule} from "../../shared/shared.module";

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;
  let signUpApiService: SignUpApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, SharedModule],
      declarations: [SignUpFormComponent],
      providers: [FormBuilder, SignUpApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    signUpApiService = TestBed.inject(SignUpApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when initialized', () => {
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('should not proceed with submission if form is invalid', () => {
    jest.spyOn(signUpApiService, 'registerUser');

    component.onSubmit();

    expect(signUpApiService.registerUser).not.toHaveBeenCalled();
  });


  it('should call signUpApiService.registerUser with correct data if form is valid', () => {
    const mockUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123'
    };

    const mockUserInformation = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    }

    jest.spyOn(signUpApiService, 'registerUser').mockReturnValue(of(mockUserInformation));

    component.signUpForm.controls['firstName'].setValue(mockUser.firstName);
    component.signUpForm.controls['lastName'].setValue(mockUser.lastName);
    component.signUpForm.controls['email'].setValue(mockUser.email);
    component.signUpForm.controls['password'].setValue(mockUser.password);

    component.onSubmit();

    expect(signUpApiService.registerUser).toHaveBeenCalledWith(mockUser);
  });

  it('should reset the form after successful submission', () => {
    const mockUserInformation = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
    }
    jest.spyOn(signUpApiService, 'registerUser').mockReturnValue(of(mockUserInformation));
    jest.spyOn(component.signUpForm, 'reset');

    component.signUpForm.setValue({...mockUserInformation, password: 'Password123'})

    component.onSubmit();

    expect(component.signUpForm.reset).toHaveBeenCalled();
  });
});
