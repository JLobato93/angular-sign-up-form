import {Injectable} from '@angular/core';
import isEmail from 'validator/lib/isEmail';
import {AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";

export const ERROR_TYPES = {
  INVALID_EMAIL: 'invalidEmail',
  INVALID_PASSWORD: 'invalidPassword',
  REQUIRED: 'required'
}

export const VALIDATION_ERRORS = {
  MIN_LENGTH_ERROR: 'minLengthError',
  UPPERCASE_ERROR: 'uppercaseError',
  LOWERCASE_ERROR: 'lowercaseError',
  FIRST_NAME_ERROR: 'firstNameError',
  LAST_NAME_ERROR: 'lastNameError'
}

export const PASSWORD_ERROR_MESSAGES = {
  MIN_LENGTH_ERROR: 'Password must be at least 8 characters',
  UPPERCASE_ERROR: 'Password must contain at least 1 uppercase letter',
  LOWERCASE_ERROR: 'Password must contain at least 1 lowercase letter',
  FIRST_NAME_ERROR: 'Password cannot contain first name',
  LAST_NAME_ERROR: 'Password cannot contain last name'
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  validateEmail(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (email === null || email === undefined) {
      return null;
    }
    if (!isEmail(email)) {
      return {invalidEmail: true};
    }
    return null;
  }

  private containsStrCaseInsensitive(str: string, subStr: string): boolean {
    return str.toLowerCase().includes(subStr.toLowerCase());
  }

  private containsNameIfPresent(password: string, name: string): boolean {
    return name ? this.containsStrCaseInsensitive(password, name) : false;
  }

  /**
   * Returns a validator function for password field validation. This is done to:
   * 1. Allow the password field to be validated against the firstName and lastName fields
   * 2. Maintaining 'this' context of the ValidationService
   */
  validatePassword(): (form: FormGroup) => (ValidationErrors | null) {
    return (form: FormGroup): ValidationErrors | null => {
      const firstName = form.get('firstName')?.value || '';
      const lastName = form.get('lastName')?.value || '';
      const passwordControl = form.get('password');

      if (!passwordControl) {
        return null;
      }

      const password = form.get('password')?.value || '';

      const passwordErrors: ValidationErrors = {};
      const hasMinLength = password.length >= 8;
      const hasUpper = /[A-Z]/.test(password || '');
      const hasLower = /[a-z]/.test(password || '');
      const hasFirstName = this.containsNameIfPresent(password, firstName);
      const hasLastName = this.containsNameIfPresent(password, lastName);

      if (!hasMinLength) passwordErrors['minLengthError'] = true;
      if (!hasUpper) passwordErrors["uppercaseError"] = true;
      if (!hasLower) passwordErrors["lowercaseError"] = true;
      if (hasFirstName) passwordErrors["firstNameError"] = true;
      if (hasLastName) passwordErrors["lastNameError"] = true;

      if (Object.keys(passwordErrors).length > 0) {
       return {invalidPassword: passwordErrors}
      }

      return null
    }
  }

  isError(form: FormGroup, controlName: string, errorType: string): boolean {
    const control = form.get(controlName);

    if (!control) {
      return false;
    }
    switch (errorType) {
      case ERROR_TYPES.INVALID_EMAIL:
      case ERROR_TYPES.REQUIRED:
        return control.touched && control.hasError(errorType);
      case ERROR_TYPES.INVALID_PASSWORD:
        return control.touched && form.hasError(errorType);
      default:
        return false;
    }
  }

  passwordErrorMessage(errorKey: string): string {
    switch (errorKey) {
      case VALIDATION_ERRORS.MIN_LENGTH_ERROR:
        return PASSWORD_ERROR_MESSAGES.MIN_LENGTH_ERROR;
      case VALIDATION_ERRORS.UPPERCASE_ERROR:
        return PASSWORD_ERROR_MESSAGES.UPPERCASE_ERROR;
      case VALIDATION_ERRORS.LOWERCASE_ERROR:
        return PASSWORD_ERROR_MESSAGES.LOWERCASE_ERROR;
      case VALIDATION_ERRORS.FIRST_NAME_ERROR:
        return PASSWORD_ERROR_MESSAGES.FIRST_NAME_ERROR;
      case VALIDATION_ERRORS.LAST_NAME_ERROR:
        return PASSWORD_ERROR_MESSAGES.LAST_NAME_ERROR;
      default:
        return ''
    }
  }

  getObjectKeys(obj: Record<string, boolean>): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
