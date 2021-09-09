import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

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

  public getCompanyInfo(companyId, selectedDate: NgbDate): Observable<any> {
    return this.http
      .get(
        environment.urlApi +
          "company/getcompanyinfocomplete?companyId=" +
          companyId +
          "&selectedDate=" +
          selectedDate.year +
          "-" +
          selectedDate.month +
          "-" +
          selectedDate.day
      )
      .pipe(map(this.extractData));
  }

  public getCompanies(
    page,
    pageSize,
    idCity,
    idState,
    longitude,
    latitude
  ): Observable<any> {
    return this.http
      .get(
        environment.urlApi +
          "company/get?page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&idCity=" +
          idCity +
          "&idState=" +
          idState +
          "&longitude=" +
          longitude +
          "&latitude=" +
          latitude
      )
      .pipe(map(this.extractData));
  }

  public getStates(): Observable<any> {
    return this.http
      .get(environment.urlApi + "company/getstates")
      .pipe(map(this.extractData));
  }

  public getCitiesByState(idState): Observable<any> {
    return this.http
      .get(environment.urlApi + "company/getcitiesbystate?IdState=" + idState)
      .pipe(map(this.extractData));
  }
}
