import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}
  title: string;
  okText: string;
  bodyText: string;
  ngOnInit(): void {}
  ok() {
    this.activeModal.close();
  }
}
