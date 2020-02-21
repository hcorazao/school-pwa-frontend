import { Component } from '@angular/core';
import {
  Plugins,
} from '@capacitor/core';
import { Motion } from '@capacitor/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-staff-directory',
  templateUrl: 'staff-directory.page.html',
  styleUrls: ['staff-directory.page.scss'],
})
export class StaffDirectoryPage {
  orientationType;

  public participatingSchoolItems = [
    { schoolName: 'Teacher name', schoolIcon: 'assets/images/school.jpg', adminIcon: 'assets/images/user.png', description: 'Club membership name', points: '545 *Points received' },
    { schoolName: 'Teacher name', schoolIcon: 'assets/images/school.jpg', adminIcon: 'assets/images/user.png', description: 'Club membership name', points: '545 *Points received' },
  ]
  constructor(
    private screenOrientation: ScreenOrientation,
    public utilService: UtilService
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

  }



}
