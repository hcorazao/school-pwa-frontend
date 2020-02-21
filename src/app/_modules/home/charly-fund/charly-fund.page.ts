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
  selector: 'app-charly-fund',
  templateUrl: 'charly-fund.page.html',
  styleUrls: ['charly-fund.page.scss'],
})
export class CharlyFundPage {
  orientationType;
  public schoolItems = [
    { name: 'Schools Participating', icon: 'chevron-forward-outline', route: 'school-participate', description: '' },
    { name: 'Contributions Statments', icon: 'chevron-forward-outline', route: '', description: 'Cooperation by Connecting & Sharing' },
  ]
  constructor(
    private router: Router,
    public utilService: UtilService,
    public screenOrientation: ScreenOrientation
  ) {
    this.orientationType = this.screenOrientation.type;
    Motion.addListener('orientation', (event: OrientationType) => {
      let type: any = event;
      this.orientationType = type.srcElement.screen.orientation.type;
    })

  }

  ngOnInit() {

  }
  async ionViewDidEnter() { }
  routePage(route) {
    if (route) {
      this.router.navigate([route]);
    }
  }
}
