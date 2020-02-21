import { Component, ChangeDetectorRef } from '@angular/core';
import {
  Plugins,
} from '@capacitor/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { Motion } from '@capacitor/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SchoolService } from 'src/app/services/school.service';
const { Clipboard } = Plugins;

declare var google: any;
@Component({
  selector: 'app-school-participating',
  templateUrl: 'school-participating.page.html',
  styleUrls: ['school-participating.page.scss'],
})
export class SchoolParticipatingPage {
  orientationType;

  loc:string = 'Tulsa';

  participatingSchool: Array<any> = [];

  // public participatingSchoolItems = [
  //   { schoolName: 'School name', adminName: 'Admin', schoolIcon: 'assets/images/school.jpg', adminIcon: 'assets/images/user.png', description: 'Private or Public', points: '545 *Points received' },
  //   { schoolName: 'School name', adminName: 'Admin', schoolIcon: 'assets/images/school.jpg', adminIcon: 'assets/images/user.png', description: 'Private or Public', points: '545 *Points received' },
  // ]

  constructor(
    private router: Router,
    public utilService: UtilService,
    public screenOrientation: ScreenOrientation,
    private schoolService: SchoolService,
    private cf: ChangeDetectorRef
  ) {

    this.orientationType = this.screenOrientation.type;
    Motion.addListener('orientation', (event: OrientationType) => {
      let type: any = event;
      this.orientationType = type.srcElement.screen.orientation.type;
    })
   
  }

  ngOnInit() {
    // var lat = '';
    // var lng = '';
    // var address: any = 176215;
    // let geocoder = new google.maps.Geocoder();
    // geocoder.geocode({ 'address': 'address ' + address }, function (results, status) {
    //   console.log(results)
    //   if (results[0].formatted_address) {
    //     lat = results[0].geometry.location.lat();
    //     lng = results[0].geometry.location.lng();
    //     let addres = results[0].formatted_address;
    //     this.loc = addres;
    //     console.log(this.loc)
    //   } else {
    //     alert("Geocode was not successful for the following reason: " + status);
    //   }
    // });
    // console.log('Latitude: ' + lat + ' Logitude: ' + lng);
  }


  async ionViewDidEnter() {
    this.getSchoolsList();
  }

  async getSchoolsList() {
    await this.schoolService.getSchoolList()
      .subscribe(
        async (data: any) => {
          console.log(data)
          if (data.success == true) {
            this.participatingSchool = data;
          }
        },
        error => {
          if (error.error == undefined) {
            this.utilService.error(error);
          } else { this.utilService.error(error.error); }
        });
  }


}
