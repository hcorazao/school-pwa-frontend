import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ng2-tooltip-directive';
import { HomePage } from './home.page';
import { CharlyFundPage } from './charly-fund/charly-fund.page';
import { SchoolParticipatingPage } from './school-participating/school-participating.page';
import { SchoolPage } from './school/school.page';
import { AddStaffPage } from './add-staff/add-staff.page';
import { AddSchoolPage } from './add-school/add-school.page';
import { StaffDirectoryPage } from './staff-directory/staff-directory.page';
import { CompanyQrReaderPage } from './company-qr-reader/company-qr-reader.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchFilterModule } from 'src/app/shared/pipes/search-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SearchFilterModule,
    TooltipModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage,
    CharlyFundPage,
    SchoolParticipatingPage,
    SchoolPage,
    AddStaffPage,
    AddSchoolPage,
    CompanyQrReaderPage,
    StaffDirectoryPage],
  entryComponents: []
})
export class HomePageModule { }
