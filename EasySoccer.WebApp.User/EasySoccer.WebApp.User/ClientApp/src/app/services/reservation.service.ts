import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  constructor(private http: HttpClient) {}
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public postCreateReservation(
    soccerPitchId,
    soccerPitchPlanId,
    selectedDate: NgbDate,
    hourStart,
    hourEnd
  ): Observable<any> {
    return this.http
      .post(environment.urlApi + "SoccerPitchReservation/makeschedule", {
        SoccerPitchId: soccerPitchId,
        SoccerPitchPlanId: soccerPitchPlanId,
        SelectedDate:
          selectedDate.year + "-" + selectedDate.month + "-" + selectedDate.day,
        HourStart: hourStart,
        HourEnd: hourEnd,
        Application: 4,
      })
      .pipe(map(this.extractData));
  }

  public getMyReservation(page, pageSize): Observable<any> {
    return this.http
      .get(
        environment.urlApi +
          "SoccerPitchReservation/getuserschedules?page=" +
          page +
          "&pageSize=" +
          pageSize
      )
      .pipe(map(this.extractData));
  }
}
