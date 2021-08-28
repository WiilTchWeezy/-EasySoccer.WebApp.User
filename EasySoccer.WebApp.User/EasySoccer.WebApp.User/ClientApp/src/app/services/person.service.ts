import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PersonService {
  endpoint = environment.urlApi;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public postCreatePerson(name, email, phone, password): Observable<any> {
    return this.http
      .post(environment.urlApi + "user/createUser", {
        name,
        email,
        PhoneNumber: phone,
        CreatedFrom: 2,
        Password: password,
      })
      .pipe(map(this.extractData));
  }
}
