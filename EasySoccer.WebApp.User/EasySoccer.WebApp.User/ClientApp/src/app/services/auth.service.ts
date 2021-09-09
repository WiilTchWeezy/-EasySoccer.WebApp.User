import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ToastService } from "../base/services/toast.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  authEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient,
    private toastService: ToastService
  ) {}
  isAuth() {
    let token = this.cookieService.get("token");
    var expireDate = new Date(this.cookieService.get("expireDate"));
    if (token != null && token != "" && token != undefined) {
      this.authEmitter.emit(true);
      return true;
    } else {
      this.authEmitter.emit(false);
      return false;
    }
  }

  logOff() {
    this.cookieService.delete("token", "/");
    this.cookieService.delete("expireDate");
    this.authEmitter.emit(false);
  }

  login(email: string, password: string) {
    this.authApi(email, password).subscribe(
      (response) => {
        var expiresDate = new Date(response.expireDate);
        this.cookieService.set("token", response.token, expiresDate, "/");
        this.cookieService.set("expireDate", response.expireDate);
        this.authEmitter.emit(true);
        return true;
      },
      (error) => {
        this.authEmitter.emit(false);
        this.toastService.showError(
          "Ops! ocorreu um erro." + error?.error?.message
        );
        return false;
      }
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  authApi(email: string, password: string): Observable<any> {
    return this.httpClient
      .get(
        environment.urlApi +
          "login/token?email=" +
          email +
          "&password=" +
          password
      )
      .pipe(map(this.extractData));
  }

  getUserInfo(): Observable<any> {
    return this.httpClient
      .get(environment.urlApi + "user/getInfo")
      .pipe(map(this.extractData));
  }

  requestResetPassword(email): Observable<any> {
    return this.httpClient
      .post(environment.urlApi + "user/requestresetpassword", { Email: email })
      .pipe(map(this.extractData));
  }

  resetPassword(token, password): Observable<any> {
    return this.httpClient
      .post(environment.urlApi + "user/resetpassword", {
        Token: token,
        Password: password,
      })
      .pipe(map(this.extractData));
  }
}
