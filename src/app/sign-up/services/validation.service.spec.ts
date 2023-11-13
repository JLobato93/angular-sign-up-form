import {TestBed} from '@angular/core/testing';
import {ERROR_TYPES, PASSWORD_ERROR_MESSAGES, VALIDATION_ERRORS, ValidationService} from './validation.service';
import {FormGroup, Validators, FormBuilder, ReactiveFormsModule} from '@angular/forms';

describe('ValidationService', () => {
  let service: ValidationService;
  let form: FormGroup;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [ValidationService]
    });
    service = TestBed.inject(ValidationService);
    formBuilder = TestBed.inject(FormBuilder);

    form = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, service.validateEmail.bind(service)]],
      password: ['', Validators.required,]
    }, {validators: service.validatePassword()});
  });

  describe('validateEmail', () => {
    it('should return null for valid email', () => {
      const control = formBuilder.control('test@example.com');
      const result = service.validateEmail(control);
      expect(result).toBeNull();
    });

    it('should return invalidEmail error for invalid email', () => {
      const control = formBuilder.control('invalid-email');
      const result = service.validateEmail(control);
      const expectedError = {invalidEmail: true};
      expect(result).toEqual(expectedError);
    });

    it('should return null for empty email', () => {
      const control = formBuilder.control('');
      const result = service.validateEmail(control);
      const expectedError = {invalidEmail: true};
      expect(result).toEqual(expectedError);
    });

    it('should return null for null email', () => {
      const control = formBuilder.control(null);
      const result = service.validateEmail(control);
      expect(result).toBeNull();
    });

    it('should return null for undefined email', () => {
      const control = formBuilder.control(undefined);
      const result = service.validateEmail(control);
      expect(result).toBeNull();
    });
  });

  describe('validatePassword', () => {
    it('should detect minLengthError for short password and add it to form errors', () => {
      const testData = {firstName: 'John', lastName: 'Doe', email: 'john@doe.com', password: 'Short1'};
      form.setValue(testData);
      const validatorFn = service.validatePassword();
      const errors = validatorFn(form);
      const expectedErrors = {invalidPassword: {minLengthError: true}};
      expect(errors).toEqual(expectedErrors);
    });

    it('should detect uppercaseError for password without uppercase letters and add it to password control', () => {
      const testData = {firstName: 'John', lastName: 'Doe', email: 'john@doe.com', password: 'lowercase1'};
      form.setValue(testData);
      const validatorFn = service.validatePassword();
      const errors = validatorFn(form);
      const expectedErrors = {invalidPassword: {uppercaseError: true}};
      expect(errors).toEqual(expectedErrors);
    });

    it('should detect lowercaseError for password without lowercase letters and add it to password control', () => {
      const testData = {firstName: 'John', lastName: 'Doe', email: 'john@doe.com', password: 'UPPERCASE1'}
      form.setValue(testData);
      const validatorFn = service.validatePassword();
      const errors = validatorFn(form);
      const expectedErrors = {invalidPassword: {lowercaseError: true}};
      expect(errors).toEqual(expectedErrors);
    });

    it('should detect firstNameError for password containing first name and add it to password control', () => {
      const testData = {firstName: 'John', lastName: 'Doe', email: 'john@doe.com', password: 'Johnpassword1'}
      form.setValue(testData);
      const validatorFn = service.validatePassword();
      const errors = validatorFn(form);
      const expectedErrors = {invalidPassword: {firstNameError: true}};
      expect(errors).toEqual(expectedErrors);
    });

    it('should detect lastNameError for password containing last name and add it to password control', () => {
      const testData = {firstName: 'John', lastName: 'Doe', email: 'john@doe.com', password: 'passwordDoe1'}
      form.setValue(testData);
      const validatorFn = service.validatePassword();
      const errors = validatorFn(form);
      const expectedErrors = {invalidPassword: {lastNameError: true}};
      expect(errors).toEqual(expectedErrors);
    });

    it('should detect lastNameError & firstNameError for password containing last name and add it to password control', () => {
      const testData = {firstName: 'John', lastName: 'Doe', email: 'john@doe.com', password: 'johnDoe1'}
      form.setValue(testData);
      const validatorFn = service.validatePassword();
      const errors = validatorFn(form);
      const expectedErrors = {invalidPassword: {lastNameError: true, firstNameError: true}};
      expect(errors).toEqual(expectedErrors);
    });

    it('should pass validation for a valid password and password control errors should be null', () => {
      const testData = {firstName: 'John', lastName: 'Doe', email: 'john@doe.com', password: 'ValidPass123'}
      form.setValue(testData);
      const validatorFn = service.validatePassword();
      const errors = validatorFn(form);
      expect(errors).toBeNull();

    });
  });

  describe('isError', () => {
    it('should return false if the control does not exist', () => {
      const controlName = 'randomControl';
      expect(service.isError(form, controlName, ERROR_TYPES.REQUIRED)).toBe(false);
    });

    it('should return false if the control has not been touched', () => {
      const controlName = 'firstName';
      expect(service.isError(form, controlName, ERROR_TYPES.INVALID_EMAIL)).toBe(false);
    });

    it('should return true for touched control with invalid email error', () => {
      const controlName = 'email';
      let control = form.get(controlName);
      control?.markAsTouched();
      expect(service.isError(form, controlName, ERROR_TYPES.REQUIRED)).toBe(true);
    });

    it('should return true for a touched control with an invalid email error', () => {
      const controlName = 'email';
      let control = form.get(controlName);
      control?.markAsTouched();
      expect(service.isError(form, controlName, ERROR_TYPES.INVALID_EMAIL)).toBe(true);
    });

    it('should return true for a touched control with an invalid password error', () => {
      const controlName = 'password';
      let control = form.get(controlName);
      control?.markAsTouched();
      form.setErrors({invalidPassword: true});
      expect(service.isError(form, controlName, ERROR_TYPES.INVALID_PASSWORD)).toBe(true);
    });

    it('should return false for an unknown error type', () => {
      const controlName = 'email';
      let control = form.get(controlName);
      control?.markAsTouched();
      expect(service.isError(form, controlName, 'unknownError')).toBe(false);
    });
  })

  describe('passwordErrorMessage', () => {
    it('should return correct message for minLengthError', () => {
      const errorKey = VALIDATION_ERRORS.MIN_LENGTH_ERROR;
      expect(service.passwordErrorMessage(errorKey)).toBe(PASSWORD_ERROR_MESSAGES.MIN_LENGTH_ERROR);
    });

    it('should return correct message for uppercaseError', () => {
      const errorKey = VALIDATION_ERRORS.UPPERCASE_ERROR;
      expect(service.passwordErrorMessage(errorKey)).toBe(PASSWORD_ERROR_MESSAGES.UPPERCASE_ERROR);
    });

    it('should return correct message for lowercaseError', () => {
      const errorKey = VALIDATION_ERRORS.LOWERCASE_ERROR;
      expect(service.passwordErrorMessage(errorKey)).toBe(PASSWORD_ERROR_MESSAGES.LOWERCASE_ERROR);
    });

    it('should return correct message for firstNameError', () => {
      const errorKey = VALIDATION_ERRORS.FIRST_NAME_ERROR;
      expect(service.passwordErrorMessage(errorKey)).toBe(PASSWORD_ERROR_MESSAGES.FIRST_NAME_ERROR);
    });

    it('should return correct message for lastNameError', () => {
      const errorKey = VALIDATION_ERRORS.LAST_NAME_ERROR;
      expect(service.passwordErrorMessage(errorKey)).toBe(PASSWORD_ERROR_MESSAGES.LAST_NAME_ERROR);
    });

    it('should return empty string for unknown error', () => {
      const errorKey = 'unknownError';
      expect(service.passwordErrorMessage(errorKey)).toBe('');
    });
  })

  describe('getObjectKeys', () => {
    it('should return the correct keys for a non-empty object', () => {
      const testObject = {a: true, b: true, c: false};
      const expectedKeys = ['a', 'b', 'c'];
      expect(service.getObjectKeys(testObject)).toEqual(expectedKeys);
    });

    it('should return an empty array for an empty object', () => {
      expect(service.getObjectKeys({})).toEqual([]);
    });
  });
});
