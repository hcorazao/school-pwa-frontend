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
  }

  async ionViewDidEnter() {
    this.page = 0;
    this.getSchoolsList();
  }

  /**-------Data of participate schools------ */
  async getSchoolsList() {
    let data = await this.schoolService.getSchoolList(this.page).toPromise();
    this.dataCount = data.dataCount;
    this.participatingSchool = data.data;
    this.skeleton = false;
  }

  /**-------loadMoreData on scroll------ */
  loadMoreFeeds(event) {
    setTimeout(async () => {
      event.target.complete();
      this.page += 1;
      let data = await this.schoolService.getSchoolList(this.page).toPromise();
      if (data.success == false) {
        event.target.disabled = true;
      }
      else {
        // App logic to determine if all data is loaded and disable the infinite scroll
        for (let item of data.data) {
          this.participatingSchool.push(item);
        }
      }
    }, 500);
  }

}
