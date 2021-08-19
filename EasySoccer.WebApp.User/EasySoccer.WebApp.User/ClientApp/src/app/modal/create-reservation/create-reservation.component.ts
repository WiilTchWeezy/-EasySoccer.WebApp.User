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
  email: string;
  phone: string;
  selectedDate: NgbDate;
  soccerPitches: any[] = [];
  soccerPitchPlans: any[] = [];
  selectedSoccerPitch: any;
  selectedSoccerPitchPlan: any;

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
        .getBySoccerPitch(this.selectedSoccerPitch.soccerPitchId)
        .subscribe(
          (response) => {
            this.soccerPitchPlans = response;
          },
          (error) => {}
        );
    }
  }
}
