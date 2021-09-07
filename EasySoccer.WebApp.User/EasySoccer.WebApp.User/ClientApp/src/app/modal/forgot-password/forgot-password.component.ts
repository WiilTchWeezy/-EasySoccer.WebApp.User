import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "src/app/base/services/toast.service";
import { AuthService } from "src/app/services/auth.service";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  requestResetPassword() {
    this.authService.requestResetPassword(this.email).subscribe(
      (response) => {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.okText = "Ok";
        modalRef.componentInstance.bodyText =
          "Você receberá um e-mail com instruções para alterar sua senha.";
        this.activeModal.close();
      },
      (error) => {
        this.toastService.showError(error?.error?.message);
      }
    );
  }
}
