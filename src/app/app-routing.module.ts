import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./_modules/home/home.module').then(m => m.HomePageModule)
  },
  { path: 'charly-fund', loadChildren: () => import('./_modules/home/charly-fund/charly-fund.module').then(m => m.CharlyFundPageModule) },
  { path: 'school-participate', loadChildren: () => import('./_modules/home/school-participating/school-participating.module').then(m => m.SchoolParticipatingPageModule) },
  { path: 'add-school', loadChildren: () => import('./_modules/home/add-school/add-school.module').then(m => m.AddSchoolPageModule) },
  { path: 'school', loadChildren: () => import('./_modules/home/school/school.module').then(m => m.SchoolPageModule) },
  { path: 'add-staff', loadChildren: () => import('./_modules/home/add-staff/add-staff.module').then(m => m.AddStaffPageModule) },
  { path: 'qr-reader', loadChildren: () => import('./_modules/home/company-qr-reader/company-qr-reader.module').then(m => m.CompanyQrReaderPageModule) },
  { path: 'staff-directory', loadChildren: () => import('./_modules/home/staff-directory/staff-directory.module').then(m => m.StaffDirectoryPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
