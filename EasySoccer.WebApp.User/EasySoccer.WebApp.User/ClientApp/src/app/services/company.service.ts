import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CompanyService {
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

  public getCompanySchedules(companyId, selectedDate): Observable<any> {
    return this.http
      .get(
        environment.urlApi +
          "soccerpitchreservation/getschedules?companyId=" +
          companyId +
          "&selectedDate=" +
          selectedDate
      )
      .pipe(map(this.extractData));
  }

  public getCompanyInfo(companyId): Observable<any> {
    return this.http
      .get(
        environment.urlApi +
          "company/getcompanyinfocomplete?companyId=" +
          companyId
      )
      .pipe(map(this.extractData));
  }
}
