import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const { Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url = environment.ApiURL;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {

    Device.getInfo().then((res) => {
      console.log(res)
      let info = res;
    });
  }

  async addSchool(data) {
    return this.http.post(`${this.url}/school/`, data)
  }

  sendOTP(data) {
    return this.http.post(`${this.url}/otp-send`, data)
  }
  verifyOTP(data) {
    return this.http.get(`${this.url}/otp-verify/?id=${data.otp}&token=${data.authyId}`)
  }

}
