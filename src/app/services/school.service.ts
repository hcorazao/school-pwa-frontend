import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
const { Device } = Plugins;
import gql from "graphql-tag";
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

  getSchoolList(data) {
    console.log(data)
    const query = gql`
  query schools {
    schools(page:${data.page},q:"${data.query}"){
      staffPoints,
  _id,
  schoolName,
  schoolType,
  aboutSchoolFunds,
  mobileNumber,
  schoolDescription,
  schoolAchievement,
    }
    schoolCount{
      schoolPublic
      schoolPrivate
      schoolMagnet
    }
  }
`;
    return query;
    // return this.http.get<any>(`${this.url}/school/?page=${data.page}&q=${data.query}`);
  }

  addStaff(data) {
    return this.http.post<any>(`${this.url}/staff`, data);
  }

  getSchoolbyId(id) {
    const query = gql`
  query singleSchool {
    singleSchool(_id:"${id}"){
      staffPoints,
      _id,
      schoolName,
      schoolType,
      aboutSchoolFunds,
      mobileNumber,
      schoolDescription,
      schoolAchievement,
      photo
    }
  }
`;
    return query;
    // return this.http.get<any>(`${this.url}/school/` + id);
  }

  getStaff(data) {
    const query = gql`
    query StaffBySchoolId {
      StaffBySchoolId(schoolId:"${data.schoolId}", page:${data.page},q:"${data.query}"){
        _id,
        schoolId,
        staffName,
        charlyPoints,
        mobileNumber
      }
    }
  `;
    return query;
    // return this.http.get<any>(`${this.url}/staff/?page=${data.page}&schoolId=${data.schoolId}&q=${data.query}`);
  }

}
