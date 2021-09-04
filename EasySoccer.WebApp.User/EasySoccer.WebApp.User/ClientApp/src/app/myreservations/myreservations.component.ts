import { Component, OnInit } from "@angular/core";
import { ToastService } from "../base/services/toast.service";
import { ImageService } from "../services/image.service";
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
    private toastService: ToastService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.getMySchedules();
  }
  getMySchedules() {
    this.reservationService.getMyReservation(1, 99).subscribe(
      (response) => {
        this.mySchedules = response;
        this.mySchedules.forEach((x) => {
          x.companyImage = this.imageService.getImageUrlByImageName(
            x.logo,
            "company"
          );
        });
      },
      (error) => {
        this.toastService.showError(
          "Ops! ocorreu um erro." + error?.error?.message
        );
      }
    );
  }
}
