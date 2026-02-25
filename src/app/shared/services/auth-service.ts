import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LoginModel, RegisterModel } from "../models/user.model";
import { Observable } from "rxjs";
import { API_URL } from "../../core/consts/api.path";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  http = inject(HttpClient)


  Login(loginObj: LoginModel): Observable<unknown> {
    return this.http.post(API_URL.baseURL + API_URL.login, loginObj);
  }


  Register(registerObj: RegisterModel): Observable<RegisterModel> {
    return this.http.post<RegisterModel>(API_URL.baseURL + API_URL.register, registerObj)
  }
}
