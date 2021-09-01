import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbDate, NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { CreatePersonComponent } from "../modal/create-person/create-person.component";
import { CreateReservationComponent } from "../modal/create-reservation/create-reservation.component";
import { LoginComponent } from "../modal/login/login.component";
import { AuthService } from "../services/auth.service";
import { CompanyService } from "../services/company.service";
import { ImageService } from "../services/image.service";

@Component({
  selector: "app-company-detail",
  templateUrl: "./company-detail.component.html",
  styleUrls: ["./company-detail.component.css"],
})
export class CompanyDetailComponent implements OnInit {
  companyId: string;
  companyInfo: any = {};
  selectedDate: NgbDate;
  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    public imageService: ImageService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private authService: AuthService
  ) {
    this.companyId = this.route.snapshot.params.companyId;
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit(): void {
    let today = new Date();
    this.selectedDate = new NgbDate(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );

    this.getCompanyInfo();
  }
  schedule(item: any) {
    console.log(item);
    if (this.authService.isAuth()) {
      const modalRef = this.modalService.open(CreateReservationComponent);
      if (item && item.freeSoccerPitches) {
        modalRef.componentInstance.soccerPitches = item.freeSoccerPitches;
        modalRef.componentInstance.hour = item.hour;
      }
      if (this.selectedDate) {
        modalRef.componentInstance.selectedDate = this.selectedDate;
      }
    } else {
      const modalRef = this.modalService
        .open(LoginComponent)
        .result.then((response) => {
          if (response) {
            const modalRef = this.modalService.open(CreateReservationComponent);
            if (item && item.freeSoccerPitches) {
              modalRef.componentInstance.soccerPitches = item.freeSoccerPitches;
              modalRef.componentInstance.hour = item.hour;
            }
            if (this.selectedDate) {
              modalRef.componentInstance.selectedDate = this.selectedDate;
            }
          }
        });
    }
  }
  dateChanged() {
    this.getCompanyInfo();
  }
  getCompanyInfo() {
    this.companyService
      .getCompanyInfo(this.companyId, this.selectedDate)
      .subscribe(
        (response) => {
          console.log(response);
          this.companyInfo = response;
          this.companyInfo.imageLogo = this.imageService.getImageUrlByImageName(
            response.logo,
            "company"
          );
        },
        (error) => {}
      );
  }
}
