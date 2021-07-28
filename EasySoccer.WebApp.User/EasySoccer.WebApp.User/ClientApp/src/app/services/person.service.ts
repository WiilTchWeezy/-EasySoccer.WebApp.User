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

  public postCreatePerson(name, email, phone): Observable<any> {
    return this.http
      .post(environment.urlApi + "user/createPerson", {
        name,
        email,
        PhoneNumber: phone,
        CreatedFrom: 2,
      })
      .pipe(map(this.extractData));
  }
}
