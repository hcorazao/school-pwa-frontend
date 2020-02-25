import { Component, ViewChild } from '@angular/core';
import {
  Plugins,
} from '@capacitor/core';
import { Motion } from '@capacitor/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SchoolService } from 'src/app/services/school.service';
import { IonInfiniteScroll } from '@ionic/angular';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-staff-directory',
  templateUrl: 'staff-directory.page.html',
  styleUrls: ['staff-directory.page.scss'],
})
export class StaffDirectoryPage {

  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;

  orientationType;

  staffDirectories: Array<any> = [];

  page: number = 0;

  searchText;

  skeleton: boolean = true;

  constructor(
    private screenOrientation: ScreenOrientation,
    public utilService: UtilService,
    private schoolService: SchoolService
  ) {
    this.orientationType = this.screenOrientation.type;
    Motion.addListener('orientation', (event: OrientationType) => {
      let type: any = event;
      this.orientationType = type.srcElement.screen.orientation.type;
    })
  }

  ngOnInit() { }

  async ionViewDidEnter() {
    this.getStaffData();
  }

  async getStaffData() {
    await this.schoolService.getStaff(this.page).subscribe((res) => {
      if (res.success == true) {
        this.staffDirectories = res.data;
      }
      this.skeleton = false;
    },
      error => {
        if (error.error == undefined) {
          this.skeleton = false;
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
      this.schoolService.getStaff(this.page).subscribe(data => {
        if (data.success == false) {
          event.target.disabled = true;
        }
        else {
          // App logic to determine if all data is loaded and disable the infinite scroll
          for (let item of data.data) {
            this.staffDirectories.push(item);
          }
        }
      },
        error => { this.utilService.error(error); })
    }, 500);
  }
}
