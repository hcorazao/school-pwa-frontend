import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { CompanyQrReaderPage } from './company-qr-reader.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CompanyQrReaderPage
      }
    ])
  ],
  declarations: [CompanyQrReaderPage]
})
export class CompanyQrReaderPageModule {}
