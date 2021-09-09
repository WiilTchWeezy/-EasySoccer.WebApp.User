import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastService } from "../base/services/toast.service";
import { CompanyService } from "../services/company.service";
import { ImageService } from "../services/image.service";

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.css"],
})
export class CompaniesComponent implements OnInit {
  companies: Array<any> = new Array<any>();
  states: Array<any> = new Array<any>();
  cities: Array<any> = new Array<any>();
  selectedState: any = 0;
  selectedCity: any = 0;
  constructor(
    private companyService: CompanyService,
    private toastService: ToastService,
    private imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getcompanies();
    this.getStates();
  }

  getcompanies() {
    let idState = 0;
    let idCity = 0;
    if (this.selectedCity && this.selectedCity > 0) {
      idCity = this.selectedCity;
    }
    if (this.selectedState && this.selectedState > 0) {
      idState = this.selectedState;
    }
    this.companyService.getCompanies(1, 999, idCity, idState).subscribe(
      (response) => {
        this.companies = response;
        this.companies.forEach((x) => {
          x.companyImage = this.imageService.getImageUrlByImageName(
            x.logo,
            "company"
          );
        });
      },
      (error) => {
        this.toastService.showError(error?.error?.message);
      }
    );
  }

  getStates() {
    this.companyService.getStates().subscribe(
      (response) => {
        this.states = response;
      },
      (error) => {
        this.toastService.showError(error?.error?.message);
      }
    );
  }

  getCitiesByState() {
    if (this.selectedState && this.selectedState > 0) {
      this.companyService.getCitiesByState(this.selectedState).subscribe(
        (response) => {
          this.cities = response;
        },
        (error) => {
          this.toastService.showError(error?.error?.message);
        }
      );
    }
  }

  openCompany(item) {
    this.router.navigate(["/companydetail/" + item.id]);
  }
}
