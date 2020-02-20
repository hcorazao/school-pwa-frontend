import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Motion } from '@capacitor/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OtpVerificationComponent } from 'src/app/shared/components/otp-verification/otp-verification.component';
@Component({
  selector: 'app-add-school',
  templateUrl: 'add-school.page.html',
  styleUrls: ['add-school.page.scss'],
})
export class AddSchoolPage {

  public aboutSchoolForm: FormGroup;

  public schoolFundForm: FormGroup;

  public aboutOwnerForm: FormGroup;

  public schoolExposureForm: FormGroup;

  //Forms steps
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;

  title = 'Add a School';

  stepCount = 0;

  image: any;

  submitted = false;

  public schoolTypes = [
    { id: 1, name: 'Public' },
    { id: 2, name: 'Private' },
    { id: 3, name: 'Magnet' },
  ]
  orientationType;;
  constructor(
    private authenticationService: AuthenticationService,
    public screenOrientation: ScreenOrientation,
    private router: Router,
    public utilService: UtilService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public utiService: UtilService
  ) {
    this.orientationType = this.screenOrientation.type;
    Motion.addListener('orientation', (event: OrientationType) => {

      let type: any = event;
      // console.log(type.srcElement.screen.orientation.type);
      this.orientationType = type.srcElement.screen.orientation.type;
      console.log(this.orientationType);
    })

  }

  ngOnInit() {
    this.aboutSchoolForm = this.formBuilder.group({
      schoolName: new FormControl('', Validators.required),
      schoolType: new FormControl('', Validators.required),
      schoolLocation: new FormControl('', Validators.required),
    });

    this.schoolFundForm = this.formBuilder.group({
      aboutSchoolFunds: new FormControl('', Validators.required),
      staffPoints: new FormControl('', Validators.required),
    });

    this.aboutOwnerForm = this.formBuilder.group({
      fullName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
    });

    this.schoolExposureForm = this.formBuilder.group({
      photo: new FormControl('', Validators.required),
      schoolDescription: new FormControl('', Validators.required),
      schoolAchievement: new FormControl('', Validators.required),
    });
  }
  async ionViewDidEnter() {

  }
  async nextStep() {
    if (this.stepCount < 2) {
      this.stepCount = this.stepCount + 1;
      this.onStpes();
    }
    else {
      let params = {
        mobileNumber: parseInt(this.aboutOwnerForm.value.mobileNumber),
        email: "schoolPWA@gmail.com",
        countryCode: 91
      }
      await this.authenticationService.sendOTP(params)
        .subscribe(
          async (data: any) => {
            console.log(data)
            if (data.success == true) {
              const formData = { ...this.aboutSchoolForm.value, ...this.schoolFundForm.value, ...this.aboutOwnerForm.value, ...this.schoolExposureForm.value };

              const modalOption: any = {
                component: OtpVerificationComponent,
                backdropDismiss: false,
                componentProps: {
                  from: formData,
                  authyId: data.authyId
                },
              };
              const modal = await this.modalCtrl.create(modalOption);
              modal.onDidDismiss().then((data) => {
                if (data.data == 'verified') {
                  this.stepCount = this.stepCount + 1;
                  this.onStpes();
                }
              });
              return await modal.present();
            }
          },
          error => {
            console.log(error)
            if (error.error == undefined) {
              this.utiService.error(error);
            } else { this.utiService.error(error.error); }
          });
    }

  }

  back() {
    this.stepCount = this.stepCount - 1;
    this.onStpes();
  }

  onStpes() {
    switch (this.stepCount) {
      case 0: {
        this.step1 = true;
        this.step2 = false;
        this.step3 = false;
        this.step4 = false;
        this.title = 'Add a School';
        break;
      }
      case 1: {
        this.step1 = false;
        this.step2 = true;
        this.step3 = false;
        this.step4 = false;
        this.title = 'School Fund$';
        break;
      }
      case 2: {
        this.step1 = false;
        this.step2 = false;
        this.step3 = true;
        this.step4 = false;
        this.title = 'ABOUT YOU';
        break;
      }
      case 3: {
        this.step1 = false;
        this.step2 = false;
        this.step3 = false;
        this.step4 = true;
        this.title = 'School Exposure';
        break;
      }
    }
  }
  /*-------Read image url import from libraby----*/
  readUrl(event, imageType) {
    if (event.target.files && event.target.files[0]) {
      let name = event.target.files[0].name;
      let formData = new FormData();
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.image = reader.result;
      }
      formData.append('image_url', event.target.files[0], name);
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async onSubmit() {
    this.router.navigate(['school']);
    this.submitted = true;
    let loading = await this.loadingCtrl.create({
      message: "Creating account please wait..."
    });
    loading.present();
    const params = { ...this.aboutSchoolForm.value, ...this.schoolFundForm.value, ...this.aboutOwnerForm.value, ...this.schoolExposureForm.value };

    await this.authenticationService.addSchool(params)
      .then(
        async data => {
          console.log(data)
          loading.dismiss();
        },
        error => {
          loading.dismiss();
          if (error.error == undefined) {
            this.utiService.error(error);
          } else { this.utiService.error(error.error); }
        });
  }

  validation_messages = {
    'schoolName': [
      { type: 'required', message: 'School Name is required.' },
    ],
    'schoolType': [
      { type: 'required', message: 'School Type is required.' },
    ],
    'schoolLocation': [
      { type: 'required', message: 'School Location is required.' },
    ],
  }
}
