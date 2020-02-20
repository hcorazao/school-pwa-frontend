import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { SchoolParticipatingPage } from './school-participating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: SchoolParticipatingPage
      }
    ])
  ],
  declarations: [SchoolParticipatingPage]
})
export class SchoolParticipatingPageModule {}
