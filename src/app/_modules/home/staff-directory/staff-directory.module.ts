import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { StaffDirectoryPage } from './staff-directory.page';
import { SearchFilterModule } from 'src/app/shared/pipes/search-pipe.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchFilterModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: StaffDirectoryPage
      }
    ])
  ],
  declarations: [StaffDirectoryPage]
})
export class StaffDirectoryPageModule { }
