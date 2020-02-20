import { Component } from '@angular/core';
import {
  Plugins,
} from '@capacitor/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { Motion } from '@capacitor/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
const { Clipboard } = Plugins;

@Component({
  selector: 'app-school-participating',
  templateUrl: 'school-participating.page.html',
  styleUrls: ['school-participating.page.scss'],
})
export class SchoolParticipatingPage {
  orientationType;
  public participatingSchoolItems = [
    { schoolName: 'School name', adminName:'Admin', schoolIcon: 'assets/images/school.jpg', adminIcon: 'assets/images/user.png', description: 'Private or Public', points: '545 *Points received' },
    { schoolName: 'School name',adminName:'Admin', schoolIcon: 'assets/images/school.jpg', adminIcon: 'assets/images/user.png', description: 'Private or Public', points: '545 *Points received' },
  ]
  constructor(
    private router: Router,
    public utilService: UtilService,
    public screenOrientation:ScreenOrientation
  ) {
    this.orientationType = this.screenOrientation.type;
    Motion.addListener('orientation', (event: OrientationType) => {

      let type: any = event;
      // console.log(type.srcElement.screen.orientation.type);
      this.orientationType = type.srcElement.screen.orientation.type;
      console.log(this.orientationType);
    })
    
  }

  ngOnInit() {

  }
  async ionViewDidEnter() {

  }



}
