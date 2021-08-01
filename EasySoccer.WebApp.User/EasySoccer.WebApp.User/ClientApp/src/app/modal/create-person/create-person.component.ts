import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PersonService } from "src/app/services/person.service";
import { CreateReservationComponent } from "../create-reservation/create-reservation.component";

@Component({
  selector: "app-create-person",
  templateUrl: "./create-person.component.html",
  styleUrls: ["./create-person.component.css"],
})
export class CreatePersonComponent implements OnInit {
  name: string;
  email: string;
  phone: string;
  constructor(
    public activeModal: NgbActiveModal,
    private personService: PersonService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}
  save() {
    this.personService
      .postCreatePerson(this.name, this.email, this.phone)
      .subscribe(
        (response) => {
          const modalRef = this.modalService.open(CreateReservationComponent);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
