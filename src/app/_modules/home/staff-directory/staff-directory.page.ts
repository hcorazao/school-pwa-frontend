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
import { Apollo } from 'apollo-angular';  // Apollo client service

import { SchoolsQuery } from 'src/__generated__';
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

  searchText: string = '';

  skeleton: boolean = true;

  schoolId;

  constructor(
    private screenOrientation: ScreenOrientation,
    public utilService: UtilService,
    private schoolService: SchoolService,
    public activatedRoute: ActivatedRoute,
    private apollo: Apollo,
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
    // let params = {
    //   page: this.page,
    //   schoolId: this.schoolId,
    //   query: this.searchText
    // }
    // let res = await this.schoolService.getStaff(params).toPromise();
    // this.staffDirectories = res.data;
    // this.skeleton = false;
    let params = {
      schoolId: this.schoolId,
      page: this.page,
      query: this.searchText,

    }
    let query = this.schoolService.getStaff(params);
    console.log(query)
    this.apollo.query({ query })
      .subscribe((data: any) => {
        console.log(data)
        if (data.errors) {
          this.skeleton = false;
        }
        else {
          this.staffDirectories = data.data.StaffBySchoolId;
          this.skeleton = false;

        }
      },
        error => {
          this.skeleton = false;
        })
  }
  /**-----loadMoreData on scroll-----*/
  loadMoreFeeds(event) {
    setTimeout(async () => {
      event.target.complete();
      this.page += 1;
      let params = {
        page: this.page,
        schoolId: this.schoolId,
        query: this.searchText
      }
      let query = this.schoolService.getStaff(params);
      console.log(query)
      this.apollo.query({ query })
        .subscribe((data: any) => {
          console.log(data)
          if (!data.data) {
            event.target.disabled = true;
          }
          else {
            // App logic to determine if all data is loaded and disable the infinite scroll
            for (let item of data.data.StaffBySchoolId) {
              this.staffDirectories.push(item);
            }
          }
        },
          error => {
            this.skeleton = false;
          })
      // let res = await this.schoolService.getStaff(params).toPromise();
      // if (!res) {
      //   event.target.disabled = true;
      // }
      // else {
      //   // App logic to determine if all data is loaded and disable the infinite scroll
      //   for (let item of res.data) {
      //     this.staffDirectories.push(item);
      //   }
      // }
    }, 500);
  }
  async  onInput(searchValue) {
    this.staffDirectories =[];
    this.skeleton = true;
    this.searchText = searchValue;
    this.page = 0;
    let params = {
      page: this.page,
      schoolId: this.schoolId,
      query: this.searchText
    }
    let query = this.schoolService.getStaff(params);
    console.log(query)
    this.apollo.query({ query })
      .subscribe((data: any) => {
        console.log(data)
        if (!data.data) {
          this.skeleton = false;
        }
        else {
          this.skeleton = false;
          // App logic to determine if all data is loaded and disable the infinite scroll
          for (let item of data.data.StaffBySchoolId) {
            this.staffDirectories.push(item);
          }
        }
      },
        error => {
          this.skeleton = false;
        })
  }

  onClear() {
    this.searchText = '';
    this.ionViewDidEnter();
  }
}
