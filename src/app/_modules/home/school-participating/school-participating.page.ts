import { Component, ChangeDetectorRef } from '@angular/core';
import {
  Plugins,
} from '@capacitor/core';
import { UtilService } from 'src/app/services/util.service';
import { Motion } from '@capacitor/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SchoolService } from 'src/app/services/school.service';
import { environment } from 'src/environments/environment';
import { Apollo } from 'apollo-angular';  // Apollo client service

import { SchoolsQuery } from 'src/__generated__';
const { Clipboard } = Plugins;

declare var google: any;

@Component({
  selector: 'app-school-participating',
  templateUrl: 'school-participating.page.html',
  styleUrls: ['school-participating.page.scss'],
})
export class SchoolParticipatingPage {
  users;
  orientationType;

  loc: string = 'Tulsa';

  searchText: string = '';

  participatingSchool: Array<any> = [];

  apiUrl = environment.url;

  page: number = 0;

  dataCount;

  skeleton: boolean = true;

  schools;
  input: any = {
    content: "test",
    author: "Aaron Saunders"
  };

  constructor(
    public utilService: UtilService,
    public screenOrientation: ScreenOrientation,
    private schoolService: SchoolService,
    private cf: ChangeDetectorRef,
    private apollo: Apollo,
  ) {

    this.orientationType = this.screenOrientation.type;
    Motion.addListener('orientation', (event: OrientationType) => {
      let type: any = event;
      this.orientationType = type.srcElement.screen.orientation.type;
    })
    console.log(this.apollo.query);
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.page = 0;
    this.getSchoolsList();
  }

  /**-------Data of participate schools------ */
  async getSchoolsList() {
    let params = {
      page: this.page,
      query: this.searchText
    }
    let query = this.schoolService.getSchoolList(params);
    console.log(query)
    this.apollo.query<SchoolsQuery>({ query })
      .subscribe((data: any) => {
        console.log(data)
        if(data.errors) {
          this.skeleton = false;
        }
        else {
          this.participatingSchool = data.data.schools;
          this.dataCount = data.data.schoolCount;
          this.skeleton = false;
          console.log(this.participatingSchool)
          
        }
      },
      error => {
        this.skeleton = false;
      })
    // let params = {
    //   page: this.page,
    //   query: this.searchText
    // }
    // let data = await this.schoolService.getSchoolList(params).toPromise();
    // this.dataCount = data.dataCount;
    // this.participatingSchool = data.data;
    // this.skeleton = false;
  }

  /**-------loadMoreData on scroll------ */
  loadMoreFeeds(event) {
    setTimeout(async () => {
      event.target.complete();
      let params = {
        page: this.page += 1,
        query: this.searchText
      }
      let query = this.schoolService.getSchoolList(params);
      console.log(query)
      this.apollo.query<SchoolsQuery>({ query })
        .subscribe((data: any) => {
          if (!data.data.schools) {
            event.target.disabled = true;
          }
          else {
            // App logic to determine if all data is loaded and disable the infinite scroll
            for (let item of data.data.schools) {
              this.participatingSchool.push(item);
            }
          }
          console.log(this.participatingSchool)
        })
      // let params = {
      //   page: this.page += 1,
      //   query: this.searchText
      // }

      // let data = await this.schoolService.getSchoolList(params).toPromise();
      // if (data.success == false) {
      //   event.target.disabled = true;
      // }
      // else {
      //   // App logic to determine if all data is loaded and disable the infinite scroll
      //   for (let item of data.data) {
      //     this.participatingSchool.push(item);
      //   }
      // }
    }, 500);
  }

  async  onInput(searchValue) {
    this.skeleton = true;
    this.searchText = searchValue;
    this.page = 0;
    let params = {
      page: this.page,
      query: this.searchText
    }
    console.log(params)
    let query = this.schoolService.getSchoolList(params);
    this.apollo.query<SchoolsQuery>({ query })
      .subscribe((data: any) => {
        console.log(data)
        this.participatingSchool = data.data.schools;
        this.dataCount = data.data.schoolCount;
        this.skeleton = false;
        console.log(this.participatingSchool)
      })
  }

  onClear() {
    this.searchText = '';
    this.ionViewDidEnter();
  }


  // add() {
  //   this.addSchoolQuery
  //     .mutate(
  //       {
  //         msgInput: {
  //           ...this.input,
  //           created: new Date()
  //         }
  //       },
  //       {
  //         update: (proxy, { data: { createSchool } }) => {
  //           debugger;
  //           // Read the data from our cache for this query.
  //           let data: any = proxy.readQuery({ query: this.schoolQuery.document });

  //           // Add our School from the mutation to the end.
  //           data.getAllSchool.push(createSchool);

  //           // Write our data back to the cache.
  //           proxy.writeQuery({ query: this.schoolQuery.document, data });
  //         }
  //       }
  //     )
  //     .subscribe(
  //       ({ data }) => {
  //         console.log("got data", data);
  //         this.input = {};
  //       },
  //       error => {
  //         alert("there was an error sending the query " + error);
  //       }
  //     );
  // }

}
