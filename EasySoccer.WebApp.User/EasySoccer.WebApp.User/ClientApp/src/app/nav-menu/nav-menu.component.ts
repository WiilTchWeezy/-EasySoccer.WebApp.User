import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LogoutComponent } from "../modal/logout/logout.component";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"],
})
export class NavMenuComponent implements OnInit {
  userName: string = "";
  isExpanded = false;
  isAuth: boolean = false;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.authService.authEmitter.subscribe((value) => {
      this.isAuth = value;
      if (value) {
        this.getUserInfo();
      }
    });
    this.isAuth = this.authService.isAuth();
  }
  getUserInfo() {
    this.authService.getUserInfo().subscribe(
      (response) => {
        this.userName = response.name;
      },
      (error) => {}
    );
  }

  logout() {
    this.modalService.open(LogoutComponent).result.then(
      (result) => {
        this.authService.logOff();
      },
      (reason) => {}
    );
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
