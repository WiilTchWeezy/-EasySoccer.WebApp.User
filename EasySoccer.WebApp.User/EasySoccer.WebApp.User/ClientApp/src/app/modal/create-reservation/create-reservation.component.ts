import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbDate, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ReservationService } from "src/app/services/reservation.service";
import { SoccerPitchPlanService } from "src/app/services/soccer-pitch-plan.service";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: "app-create-reservation",
  templateUrl: "./create-reservation.component.html",
  styleUrls: ["./create-reservation.component.css"],
})
export class CreateReservationComponent implements OnInit {
  name: string;
  hourEnd: string;
  phone: string;
  hour: number;
  selectedDate: NgbDate;
  selectedHour: any;
  soccerPitches: any[] = [];
  soccerPitchPlans: any[] = [];
  selectedSoccerPitch: any;
  selectedSoccerPitchPlan: any;
  optionsHours: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private soccerPitchPlanService: SoccerPitchPlanService,
    private reservatioService: ReservationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  save() {
    this.reservatioService
      .postCreateReservation(
        this.selectedSoccerPitch.id,
        this.selectedSoccerPitchPlan.id,
        this.selectedDate,
        this.selectedHour.hourStart,
        this.hourEnd
      )
      .subscribe(
        (response) => {
          const modalRef = this.modalService.open(ModalComponent);
          modalRef.componentInstance.okText = "Ok";
          modalRef.componentInstance.bodyText =
            "Horário reservado com sucesso!";
          this.activeModal.close();
        },
        (error) => {}
      );
  }

  soccerPitchChanged() {
    if (this.selectedSoccerPitch) {
      console.log(this.selectedSoccerPitch);
      this.soccerPitchPlanService
        .getBySoccerPitch(this.selectedSoccerPitch.id)
        .subscribe(
          (response) => {
            this.soccerPitchPlans = response;
            this.optionsHours = this.selectedSoccerPitch.avaliableHours;
            this.selectedHour = this.selectedSoccerPitch.avaliableHours.filter(
              (x) => x.hour == this.hour
            )[0];
            this.hourChanged();
          },
          (error) => {}
        );
    }
  }

  hourChanged() {
    if (this.selectedHour) this.hourEnd = this.selectedHour.hourEnd;
  }
}
