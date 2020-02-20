import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { GoogleAutocompleteDirective } from '../shared/directives/google-autocomplete.directive';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
  ],
  declarations: [
    GoogleAutocompleteDirective,
    OtpVerificationComponent
  ],
  exports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    GoogleAutocompleteDirective,
    OtpVerificationComponent
  ],
  entryComponents: [
    OtpVerificationComponent
  ],

})

export class SharedModule { }
