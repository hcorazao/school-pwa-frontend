import { Component, Input, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { AlertController, ModalController, NavParams, NavController, Platform, LoadingController } from "@ionic/angular";
import { AuthenticationService } from "../../../services/authentication.service";
import { UtilService } from "../../../services/util.service";
import { first } from "rxjs/operators";
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})

export class OtpVerificationComponent implements OnInit, OnDestroy {
  public otpForm: FormGroup;

  verified: boolean = false;

  formData;

  authyId;

  constructor(
    public alertController: AlertController,
    public navParams: NavParams,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public utilService: UtilService,
    public authenticationService: AuthenticationService,
    public loadingCtrl: LoadingController,
    public router: Router,
    public modalCtrl: ModalController) {

    let params = navParams.data;
    if (params.modal.ComponentProps != undefined) {
      this.formData = params.modal.ComponentProps.data;
      this.authyId = params.modal.ComponentProps.authyId;
    }
  }
  ngOnInit() {
    this.otpForm = this.formBuilder.group({
      otp: new FormControl('', Validators.required),
    });
  }

  ionViewDidEnter() { }

  ngOnDestroy() {
    // this.unsubscribe();
  }

  async onSumbit() {

    let loading = await this.loadingCtrl.create({
      message: "Creating account please wait..."
    });
    loading.present();
    let params = {
      otp: this.otpForm.value.otp,
      authyId: this.authyId
    }
    await this.authenticationService.verifyOTP(params)
      .subscribe(
        async data => {
          loading.dismiss();
          this.verified = true;
          // this.router.navigate(['school']);
        },
        error => {
          loading.dismiss();
          if (error.error == undefined) {
            this.utilService.error(error);
          } else { this.utilService.error(error.error); }
        });
  }

  async back() {
    this.modalCtrl.dismiss();
  }

  onContinue() {
    this.modalCtrl.dismiss('verified');
  }
}