import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocationServiceService {
  constructor() {}
  public currentLocation: any = {};
  getLocation(): void {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = position.coords;
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
}
