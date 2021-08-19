import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: "root",
})
export class SoccerPitchPlanService {
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

  public getBySoccerPitch(soccerPitchId): Observable<any> {
    return this.http
      .get(
        environment.urlApi +
          "SoccerPitchPlan/getbysoccerpitch?soccerPitchId=" +
          soccerPitchId
      )
      .pipe(map(this.extractData));
  }
}
