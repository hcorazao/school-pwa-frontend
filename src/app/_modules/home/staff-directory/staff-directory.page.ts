import { Component, ViewChild } from '@angular/core';
import {
  Plugins,
} from '@capacitor/core';
import { Motion } from '@capacitor/core';
import { ActivatedRoute } from '@angular/router';
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

  schoolId;

  constructor(
    private screenOrientation: ScreenOrientation,
    public utilService: UtilService,
    private schoolService: SchoolService,
    public activatedRoute: ActivatedRoute
  ) {
    this.orientationType = this.screenOrientation.type;
    Motion.addListener('orientation', (event: OrientationType) => {
      let type: any = event;
      this.orientationType = type.srcElement.screen.orientation.type;
    })
    this.activatedRoute.params.subscribe(params => {
      this.schoolId = params.id;
    });
  }

  ngOnInit() { }

  async ionViewDidEnter() {
    this.getStaffData();
  }

  /**-----Get staff data @param schoolId-----*/
  async getStaffData() {
    let params = {
      page: this.page,
      schoolId: this.schoolId
    }
    let res = await this.schoolService.getStaff(params).toPromise();
    this.staffDirectories = res.data;
    this.skeleton = false;
  }
  /**-----loadMoreData on scroll-----*/
  loadMoreFeeds(event) {
    setTimeout(async () => {
      event.target.complete();
      this.page += 1;
      let res = await this.schoolService.getStaff(this.page).toPromise();
      if (!res) {
        event.target.disabled = true;
      }
      else {
        // App logic to determine if all data is loaded and disable the infinite scroll
        for (let item of res.data) {
          this.staffDirectories.push(item);
        }
      }
    }, 500);
  }
}
