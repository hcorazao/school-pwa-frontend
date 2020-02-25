import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
const { Device } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  url = environment.ApiURL;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {
    Device.getInfo().then((res) => {
      let info = res;
    });
  }

  addSchool(data) {
    return this.http.post<any>(`${this.url}/school`, data);
  }

  getSchoolList(page) {
    return this.http.get<any>(`${this.url}/school/?page=` + page);
  }

  addStaff(data) {
    return this.http.post<any>(`${this.url}/staff`, data);
  }

  getSchoolbyId(id) {
    return this.http.get<any>(`${this.url}/school/` + id);
  }

  getStaff(page) {
    return this.http.get<any>(`${this.url}/staff/?page=` + page);
  }

}
