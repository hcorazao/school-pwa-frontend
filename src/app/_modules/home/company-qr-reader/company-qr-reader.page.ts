import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-company-qr-reader',
  templateUrl: 'company-qr-reader.page.html',
  styleUrls: ['company-qr-reader.page.scss'],
})

export class CompanyQrReaderPage {

  public staffForm: FormGroup;

  submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    public utilService: UtilService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController
  ) {

  }

  ngOnInit() {
    this.staffForm = this.formBuilder.group({
      staffName: new FormControl('', Validators.required),
      staffMobile: new FormControl('', Validators.required),
      charlyPoints: new FormControl('', Validators.required),
    });
  }

  async ionViewDidEnter() {

  }

  async onSumbit() {
    this.router.navigate(['school']);
    // this.submitted = true;
    // let loading = await this.loadingCtrl.create({
    //   message: "Creating account please wait..."
    // });
    // loading.present();
    // const params = { ...this.aboutSchoolForm.value, ...this.schoolFundForm.value, ...this.aboutOwnerForm.value, ...this.schoolExposureForm.value };

    // await this.authenticationService.addSchool(params)
    //   .then(
    //     async data => {
    //       console.log(data)
    //       loading.dismiss();
    //     },
    //     error => {
    //       loading.dismiss();
    //       if (error.error == undefined) {
    //         this.utiService.error(error);
    //       } else { this.utiService.error(error.error); }
    //     });
  }

}
