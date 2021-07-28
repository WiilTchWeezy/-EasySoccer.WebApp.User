import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PersonService } from "src/app/services/person.service";

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
    private personService: PersonService
  ) {}

  ngOnInit(): void {}
  save() {
    this.personService
      .postCreatePerson(this.name, this.email, this.phone)
      .subscribe(
        (response) => {
          console.log("Ok");
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
