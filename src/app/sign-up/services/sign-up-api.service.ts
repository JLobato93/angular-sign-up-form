import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, take, tap} from "rxjs";
import {ToastService} from "../../shared/services/toast.service";
import {environment} from "../../../environments/environment";
import {SignUpInformation, UserInformation} from "../../shared/model/sign-up.model";

@Injectable({
  providedIn: 'root'
})
export class SignUpApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private toastService: ToastService) {}

  registerUser(user: SignUpInformation): Observable<UserInformation> {
    const apiData: UserInformation = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }

    return this.http.post<UserInformation>(this.apiUrl, apiData).pipe(
      take(1),
      tap(() => {
        this.toastService.showToast('User registered successfully');
      })
    )
  }
}
