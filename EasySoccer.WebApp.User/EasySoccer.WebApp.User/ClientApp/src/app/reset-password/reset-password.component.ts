import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "../base/services/toast.service";
import { ModalComponent } from "../modal/modal/modal.component";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  newPassword: string;
  confirmPassword: string;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.token = this.route.snapshot.params.token;
  }

  ngOnInit(): void {}

  resetPassword() {
    if (this.newPassword != this.confirmPassword) {
      this.toastService.showWarnig("As senhas devem ser iguais.");
    } else {
      this.authService.resetPassword(this.token, this.newPassword).subscribe(
        (response) => {
          const modalRef = this.modalService.open(ModalComponent);
          modalRef.componentInstance.okText = "Ok";
          modalRef.componentInstance.bodyText =
            "Senha alterada com sucesso! Realize seu login.";
          this.router.navigate(["/"]);
        },
        (error) => {
          this.toastService.showError(error?.error?.message);
          this.router.navigate(["/"]);
        }
      );
    }
  }
}
