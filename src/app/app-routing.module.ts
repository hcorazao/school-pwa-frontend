import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { HomePage } from './_modules/home/home.page';
import { CharlyFundPage } from './_modules/home/charly-fund/charly-fund.page';
import { SchoolParticipatingPage } from './_modules/home/school-participating/school-participating.page';
import { AddSchoolPage } from './_modules/home/add-school/add-school.page';
import { SchoolPage } from './_modules/home/school/school.page';
import { AddStaffPage } from './_modules/home/add-staff/add-staff.page';
import { CompanyQrReaderPage } from './_modules/home/company-qr-reader/company-qr-reader.page';
import { StaffDirectoryPage } from './_modules/home/staff-directory/staff-directory.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomePage
  },
  {
    path: 'charly', component: CharlyFundPage
  },
  {
    path: 'participate',
    component: SchoolParticipatingPage,
  },
  {
    path: 'add-school',
    component: AddSchoolPage
  },
  {
    path: 'school/:id',
    component: SchoolPage
  },
  {
    path: 'add-staff/:id',
    component: AddStaffPage
  },
  {
    path: 'qr-reader',
    component: CompanyQrReaderPage
  },
  {
    path: 'staff-directory/:id',
    component: StaffDirectoryPage
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
