import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SignUpApiService} from './sign-up-api.service';
import {ToastService} from '../../shared/services/toast.service';

describe('SignUpApiService', () => {
  let service: SignUpApiService;
  let httpTestingController: HttpTestingController;
  let toastServiceMock: Partial<ToastService>;

  beforeEach(() => {
    toastServiceMock = {
      showToast: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SignUpApiService,
        {provide: ToastService, useValue: toastServiceMock}
      ]
    });

    service = TestBed.inject(SignUpApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerUser', () => {
    it('should send post request to register user and show toast on success', () => {
      const mockUser = {firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com'};
      const mockApiUser = {...mockUser, password: 'UserPassword123'};
      const mockResponse = {firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com', _id: '12345678'};

      service.registerUser(mockApiUser).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(toastServiceMock.showToast).toHaveBeenCalledWith('User registered successfully');
      });

      const req = httpTestingController.expectOne('https://demo-api.now.sh/users');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(mockUser);

      req.flush(mockResponse);
    });
  })
});
