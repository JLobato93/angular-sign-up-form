# Angular Sign-Up Form Application

## Overview
This application is a simple Angular-based single-page application (SPA) functioning as a sign-up form. It demonstrates fundamental Angular concepts including form handling, API integration, and custom validation.

### Live Demo
The application is deployed and can be accessed at [https://sign-up.jeffreylobato.com/](https://sign-up.jeffreylobato.com/). It is hosted using Firebase Hosting.

## Features
- **User Registration**: Allows users to register by filling in their first name, last name, email, and password.
- **API Integration**: Sends a POST request to a demo API endpoint at [https://demo-api.now.sh/users](https://demo-api.now.sh/users) to create a user account. The API expects a JSON payload in the format: `{ "firstName": "<string>", "lastName": "<string>", "email": "<string>" }`.
- **Form Validation**: Implements validation for:
  - Email: Validates the email format.
  - First Name & Last Name: Ensures these fields are not left empty.
  - Password: Uses a custom validator (Note: The password is not sent to the API as it does not accept password data).
- **HTTP Interceptor**: Includes an HTTP interceptor that handles HTTP errors gracefully. It displays informative toast notifications to inform users of success or error messages.
- **Loading Indicator**: Features a CSS-based loading animation (sourced from [https://loading.io/css/](https://loading.io/css/)) shown during each API request. This enhances user experience by indicating processing times.
- **Toast Notifications**: Utilizes toast notifications to provide feedback on user actions, such as successful registration or error messages.

## Future Improvements
- **Logger Service**: Implement a logger service to log errors and other messages to a logging service.
- **Error Handling**: Implement a global error handler to handle errors that occur outside the HTTP interceptor.
- **CI/CD Pipeline**: Implement a CI/CD pipeline to automate the deployment process and run tests.

## Development

### Running Locally
- **Development Server**: Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- **Running Tests**: Execute `npm run test` to run the unit tests.

### Environment Configuration
- The API endpoint is set in the environment configuration files of the Angular project, allowing for easy modification for different deployment environments.

## Testing
- **Component Testing**: The main `sign-up-form` component is thoroughly tested as it constitutes the core functionality of the application.
- **Service Interaction**: Tests are focused on the services to ensure proper interaction between components.
- **Disclaimer**: Not all `.component` files have dedicated tests, especially those representing simple components with minimal logic. Their interactions, however, are covered in the service tests.
