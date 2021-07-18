import { Component, OnInit } from "@angular/core";
import { CompanyService } from "../services/company.service";

@Component({
  selector: "app-company-detail",
  templateUrl: "./company-detail.component.html",
  styleUrls: ["./company-detail.component.css"],
})
export class CompanyDetailComponent implements OnInit {
  constructor(companyService: CompanyService) {}

  ngOnInit(): void {}

  getCompanyInfo() {}
}
