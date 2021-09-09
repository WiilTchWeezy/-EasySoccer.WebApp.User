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
  latitude: any;
  longitude: any;
  constructor(
    private companyService: CompanyService,
    private toastService: ToastService,
    private imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCompanies();
    this.getStates();
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getCompanies();
        },
        (failure) => {
          if (failure.message.indexOf("Only secure origins are allowed") == 0) {
            alert("Only secure origins are allowed by your browser.");
          }
        }
      );
    } else {
      console.log("Your browser doesn't support geolocation");
    }
  }

  getCompanies() {
    let idState = 0;
    let idCity = 0;
    let longitude = null;
    let latitude = null;
    if (this.selectedCity && this.selectedCity > 0) {
      idCity = this.selectedCity;
    }
    if (this.selectedState && this.selectedState > 0) {
      idState = this.selectedState;
    }
    if (this.latitude && this.latitude != 0) {
      latitude = this.latitude;
    }
    if (this.longitude && this.longitude != 0) {
      longitude = this.longitude;
    }
    this.companyService
      .getCompanies(1, 99, idCity, idState, longitude, latitude)
      .subscribe(
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
