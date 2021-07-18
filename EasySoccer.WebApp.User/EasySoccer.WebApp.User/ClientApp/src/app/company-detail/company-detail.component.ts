import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    public imageService: ImageService
  ) {
    this.companyId = this.route.snapshot.params.companyId;
  }

  ngOnInit(): void {
    this.getCompanyInfo();
  }

  getCompanyInfo() {
    this.companyService.getCompanyInfo(this.companyId).subscribe(
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
