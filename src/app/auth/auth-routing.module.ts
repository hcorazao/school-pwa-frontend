import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: 'login', component: LoginPage },
  // { path: 'signup', component: SignupPage },
  // { path: 'forget-password', component: ForgetPasswordPage },
  // { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
