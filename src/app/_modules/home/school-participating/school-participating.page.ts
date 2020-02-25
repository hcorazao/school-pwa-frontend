import { Component, ChangeDetectorRef } from '@angular/core';
import {
  Plugins,
} from '@capacitor/core';
import { UtilService } from 'src/app/services/util.service';
import { Motion } from '@capacitor/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SchoolService } from 'src/app/services/school.service';
import { environment } from 'src/environments/environment';
const { Clipboard } = Plugins;

declare var google: any;
@Component({
  selector: 'app-school-participating',
  templateUrl: 'school-participating.page.html',
  styleUrls: ['school-participating.page.scss'],
})
export class SchoolParticipatingPage {
  orientationType;

  loc: string = 'Tulsa';

  searchText;

  participatingSchool: Array<any> = [];

  apiUrl = environment.url;

  page: number = 0;

  dataCount;

  skeleton: boolean = true;

  constructor(
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
    //   if (results[0].formatted_address) {
    //     lat = results[0].geometry.location.lat();
    //     lng = results[0].geometry.location.lng();
    //     let addres = results[0].formatted_address;
    //     this.loc = addres;
    //   } else {
    //     alert("Geocode was not successful for the following reason: " + status);
    //   }
    // });
  }


  async ionViewDidEnter() {
    this.page = 0;
    this.getSchoolsList();
  }

  async getSchoolsList() {
    await this.schoolService.getSchoolList(this.page)
      .pipe().subscribe(
        async (data: any) => {
          if (data.success == true) {
            this.dataCount = data.dataCount;
            this.participatingSchool = data.data;
          }
          this.skeleton = false;
        },
        error => {
          this.skeleton = false;
          if (error.error == undefined) {
          }
        });
  }
  /**
 * @public
 * @method loadMoreData
 * @return {none}
 */
  loadMoreFeeds(event) {
    setTimeout(() => {
      event.target.complete();
      this.page += 1;
      this.schoolService.getSchoolList(this.page).subscribe(data => {
        if (data.success == false) {
          event.target.disabled = true;
        }
        else {
          // App logic to determine if all data is loaded and disable the infinite scroll
          for (let item of data.data) {
            this.participatingSchool.push(item);
          }
        }
      },
        error => { this.utilService.error(error); })
    }, 500);
  }

}
