import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PersonService } from "src/app/services/person.service";
import { CreateReservationComponent } from "../create-reservation/create-reservation.component";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: "app-create-person",
  templateUrl: "./create-person.component.html",
  styleUrls: ["./create-person.component.css"],
})
export class CreatePersonComponent implements OnInit {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  constructor(
    public activeModal: NgbActiveModal,
    private personService: PersonService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}
  save() {
    this.personService
      .postCreatePerson(this.name, this.email, this.phone, this.password)
      .subscribe(
        (response) => {
          const modalRef = this.modalService.open(ModalComponent);
          modalRef.componentInstance.okText = "Ok";
          modalRef.componentInstance.bodyText =
            "Usuário criado. Agora realize seu login.";
          this.activeModal.close();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
