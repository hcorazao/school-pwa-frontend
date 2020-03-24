import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const { Device } = Plugins;
import gql from "graphql-tag";
import { Mutation } from 'apollo-angular';

export type SMS = {
  email: string;
  mobileNumber: string;
  countryCode: boolean;
};

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
      let info = res;
    });
  }

  sendOTP(data) {
    document = gql`
        mutation sendSms(${data}) {
            email,
      mobileNumber,
      countryCode
        }
      `;
    return document;
    // return this.http.post(`${this.url}/school/otp-send`, data)
  }

  verifyOTP(data) {
    return this.http.get(`${this.url}/school/otp-verify/?id=${data.authyId}&token=${data.otp}`)
  }

  uploadPhoto(data) {
    return this.http.post(`${this.url}/school/image-upload/`, data);
  }

}

export type AddSMSMutation = {
  sms: SMS;
};

export type AddSMSVariables = {
  sendSms: {
    email: string;
    mobileNumber: string;
    countryCode: boolean;
  };
};

@Injectable({
  providedIn: "root"
})
export class AddSchoolGQL extends Mutation<
AddSMSMutation,
AddSMSVariables
> {
  document = gql`
    mutation sendSms($sendSms: sendSms!) {
      sendSms(sendSms: "$sendSms") {
        email,
  mobileNumber,
  countryCode
      }
    }
  `;
}
