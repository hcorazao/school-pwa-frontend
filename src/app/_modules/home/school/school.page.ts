import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Motion } from '@capacitor/core';
import { SchoolService } from 'src/app/services/school.service';
import { environment } from 'src/environments/environment';
import { Apollo } from 'apollo-angular';  // Apollo client service
import { SchoolIdQuery } from 'src/__generated__';
@Component({
  selector: 'app-school',
  templateUrl: 'school.page.html',
  styleUrls: ['school.page.scss'],
})
export class SchoolPage {

  image: any;

  apiUrl = environment.graphQlImages;

  orientationType

  _id;

  schoolDetails;

  _loading: boolean = true;

  constructor(
    public utilService: UtilService,
    private schoolService: SchoolService,
    public screenOrientation: ScreenOrientation,
    public activatedRoute: ActivatedRoute,
    private apollo: Apollo,
  ) {
    this.orientationType = this.screenOrientation.type;
    Motion.addListener('orientation', (event: OrientationType) => {
      let type: any = event;
      this.orientationType = type.srcElement.screen.orientation.type;
    })

    this.activatedRoute.params.subscribe(params => {
      this._id = params.id;
    });
  }

  ngOnInit() { }

  async ionViewDidEnter() {
    this.getSchoolById();
  }

  async getSchoolById() {
    let query = this.schoolService.getSchoolbyId(this._id);
    console.log(query)
    this.apollo.query<SchoolIdQuery>({ query })
      .subscribe((data: any) => {
        console.log(data)
        if (data.errors) {
          this._loading = false;
        }
        else {
          this.schoolDetails = data.data.singleSchool;
          setTimeout(() => {
            this._loading = false;
          }, 500);
        }
      },
        error => {
          this._loading = false;
        })
    // let res = await this.schoolService.getSchoolbyId(this._id).toPromise();
    // this.schoolDetails = res.data;
    // console.log(this.schoolDetails)
    // setTimeout(() => {
    //   this._loading = false;
    // }, 500);
  }
}
