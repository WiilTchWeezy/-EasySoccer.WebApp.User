import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CompanyDetailComponent } from "./company-detail/company-detail.component";
import { CookieService } from "ngx-cookie-service";
import { CustomInterceptorInterceptor } from "./interceptor/custom-interceptor.interceptor";
import { LoaderComponent } from "./loader/loader.component";
import { LoaderModule } from "./loader/loader.module";
import { NgxLoadingModule } from "ngx-loading";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CompanyDetailComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      [
        { path: "", component: CompanyDetailComponent, pathMatch: "full" },
        {
          path: "companydetail",
          component: CompanyDetailComponent,
          pathMatch: "full",
        },
      ],
      { relativeLinkResolution: "legacy" }
    ),
    NgbModule,
    LoaderModule,
    NgxLoadingModule.forRoot({ fullScreenBackdrop: true }),
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptorInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: "pt",
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
