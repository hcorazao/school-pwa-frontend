import { Component } from '@angular/core';
import {
  Plugins,
} from '@capacitor/core';
import { Motion } from '@capacitor/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

const { Clipboard } = Plugins;

@Component({
  selector: 'app-charly-fund',
  templateUrl: 'charly-fund.page.html',
  styleUrls: ['charly-fund.page.scss'],
})
export class CharlyFundPage {
  public schoolItems = [
    { name: 'Schools Participating', icon: 'chevron-forward-outline', route: 'school-participate', description: '' },
    { name: 'Contributions Statments', icon: 'chevron-forward-outline', route: '', description: 'Cooperation by Connecting & Sharing' },
  ]
  constructor(
    private router: Router,
    public utilService: UtilService
  ) {

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
