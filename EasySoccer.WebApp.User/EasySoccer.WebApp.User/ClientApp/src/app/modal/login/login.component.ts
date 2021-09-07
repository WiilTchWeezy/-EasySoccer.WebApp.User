import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/services/auth.service";
import { CreatePersonComponent } from "../create-person/create-person.component";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthService
  ) {}
  email: string;
  password: string;
  type: string = "danger";
  showErrorLogin: boolean = false;
  ngOnInit(): void {
    this.authService.authEmitter.subscribe((isAuth) => {
      if (isAuth) {
        this.activeModal.close(true);
      } else {
        this.showErrorLogin = true;
      }
    });
  }
  signUp() {
    const modalRef = this.modalService.open(CreatePersonComponent);
  }
  login() {
    this.authService.login(this.email, this.password);
  }

  alertClosed() {
    this.showErrorLogin = false;
  }

  forgotPassword() {
    const modalRef = this.modalService.open(ForgotPasswordComponent);
  }
}
