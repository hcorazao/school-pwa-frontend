import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Motion } from '@capacitor/core';
import { SchoolService } from 'src/app/services/school.service';
@Component({
  selector: 'app-school',
  templateUrl: 'school.page.html',
  styleUrls: ['school.page.scss'],
})
export class SchoolPage {

  image: any;

  orientationType

  _id;

  schoolDetails;

  constructor(
    private router: Router,
    public utilService: UtilService,
    private schoolService: SchoolService,
    public screenOrientation: ScreenOrientation,
    public activatedRoute: ActivatedRoute
  ) {
    this.orientationType = this.screenOrientation.type;
    Motion.addListener('orientation', (event: OrientationType) => {
      let type: any = event;
      this.orientationType = type.srcElement.screen.orientation.type;
    })

    this.activatedRoute.params.subscribe(params => {
      console.log(params)
      this._id = params.id;
    });
  }

  ngOnInit() {

  }

  async ionViewDidEnter() {
    this.getSchoolById();
  }

  async getSchoolById() {
    await this.schoolService.getSchoolbyId(this._id)
      .subscribe(
        async data => {
          console.log(data)
          this.schoolDetails = data.data;
        },
        error => {
          if (error.error == undefined) {
            this.utilService.error(error);
          } else { this.utilService.error(error.error); }
        });
  }
}
