import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-company-qr-reader',
  templateUrl: 'company-qr-reader.page.html',
  styleUrls: ['company-qr-reader.page.scss'],
})

export class CompanyQrReaderPage {

  public staffForm: FormGroup;

  submitted = false;

  constructor(
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
    this.router.navigate(['home/school']);
  }

}
