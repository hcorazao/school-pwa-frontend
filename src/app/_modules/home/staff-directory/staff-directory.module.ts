import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { StaffDirectoryPage } from './staff-directory.page';
import { SearchFilterModule } from 'src/app/shared/pipes/search-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchFilterModule,
    RouterModule.forChild([
      {
        path: '',
        component: StaffDirectoryPage
      }
    ])
  ],
  declarations: [StaffDirectoryPage]
})
export class StaffDirectoryPageModule {}
