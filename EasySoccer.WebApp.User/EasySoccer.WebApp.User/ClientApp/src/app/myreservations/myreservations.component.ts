import { Component, OnInit } from "@angular/core";
import { ToastService } from "../base/services/toast.service";
import { ReservationService } from "../services/reservation.service";

@Component({
  selector: "app-myreservations",
  templateUrl: "./myreservations.component.html",
  styleUrls: ["./myreservations.component.css"],
})
export class MyreservationsComponent implements OnInit {
  mySchedules: Array<any> = new Array<any>();
  constructor(
    private reservationService: ReservationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getMySchedules();
  }
  getMySchedules() {
    this.reservationService.getMyReservation(1, 99).subscribe(
      (response) => {
        this.mySchedules = response;
      },
      (error) => {
        this.toastService.showError(
          "Ops! ocorreu um erro." + error?.error?.message
        );
      }
    );
  }
}
