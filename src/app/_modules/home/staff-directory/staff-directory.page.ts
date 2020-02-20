import { Component } from '@angular/core';
import {
  Plugins,
} from '@capacitor/core';
import { Motion } from '@capacitor/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-staff-directory',
  templateUrl: 'staff-directory.page.html',
  styleUrls: ['staff-directory.page.scss'],
})
export class StaffDirectoryPage {
  public participatingSchoolItems = [
    { schoolName: 'Teacher name', schoolIcon: 'assets/images/school.jpg', adminIcon: 'assets/images/user.png', description: 'Club membership name', points: '545 *Points received' },
    { schoolName: 'Teacher name', schoolIcon: 'assets/images/school.jpg', adminIcon: 'assets/images/user.png', description: 'Club membership name', points: '545 *Points received' },
  ]
  constructor(
    private router: Router,
    public utilService: UtilService
  ) {

  }

  ngOnInit() {

  }
  async ionViewDidEnter() {

  }



}
