import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-create-reservation",
  templateUrl: "./create-reservation.component.html",
  styleUrls: ["./create-reservation.component.css"],
})
export class CreateReservationComponent implements OnInit {
  name: string;
  email: string;
  phone: string;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  save() {}
}
