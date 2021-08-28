import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { SoccerPitchPlanService } from "src/app/services/soccer-pitch-plan.service";

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
    private soccerPitchPlanService: SoccerPitchPlanService
  ) {}

  ngOnInit(): void {}

  save() {}

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
