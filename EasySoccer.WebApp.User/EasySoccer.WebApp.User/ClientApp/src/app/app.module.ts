import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import localePt from "@angular/common/locales/pt";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { NgbDateParserFormatter, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CompanyDetailComponent } from "./company-detail/company-detail.component";
import { CookieService } from "ngx-cookie-service";
import { CustomInterceptorInterceptor } from "./interceptor/custom-interceptor.interceptor";
import { LoaderComponent } from "./loader/loader.component";
import { LoaderModule } from "./loader/loader.module";
import { NgxLoadingModule } from "ngx-loading";
import { registerLocaleData } from "@angular/common";
import { CustomDateParserFormatter } from "./adapters/NgbdDatepickerAdapter";
import { CreatePersonComponent } from "./modal/create-person/create-person.component";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { CreateReservationComponent } from './modal/create-reservation/create-reservation.component';
import { LoginComponent } from './modal/login/login.component';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
registerLocaleData(localePt, "pt-BR");
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CompanyDetailComponent,
    LoaderComponent,
    CreatePersonComponent,
    CreateReservationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      [
        { path: "", component: CompanyDetailComponent, pathMatch: "full" },
        {
          path: "companydetail/:companyId",
          component: CompanyDetailComponent,
          pathMatch: "full",
        },
      ],
      { relativeLinkResolution: "legacy" }
    ),
    NgbModule,
    LoaderModule,
    NgxLoadingModule.forRoot({ fullScreenBackdrop: true }),
    NgxMaskModule.forRoot(),
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
      useValue: "pt-BR",
    },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
