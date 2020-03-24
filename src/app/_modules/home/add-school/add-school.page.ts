import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Motion } from '@capacitor/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AuthenticationService, AddSchoolGQL } from 'src/app/services/authentication.service';
import { OtpVerificationComponent } from 'src/app/shared/components/otp-verification/otp-verification.component';
import { SchoolService } from '../../../services/school.service';
import { first } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';  // Apollo client service
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

  imageData;

  authyId;

  public schoolTypes = [
    { id: 1, name: 'Public' },
    { id: 2, name: 'Private' },
    { id: 3, name: 'Magnet' },
  ]
  orientationType;;
  constructor(
    private authenticationService: AuthenticationService,
    public screenOrientation: ScreenOrientation,
    public schoolService: SchoolService,
    private router: Router,
    public utilService: UtilService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public utiService: UtilService,
    private apollo: Apollo,
    public addSchoolQuery: AddSchoolGQL
  ) {
    this.orientationType = this.screenOrientation.type;
    Motion.addListener('orientation', (event: OrientationType) => {
      let type: any = event;
      this.orientationType = type.srcElement.screen.orientation.type;
    })

  }

  ngOnInit() {
    this.aboutSchoolForm = this.formBuilder.group({
      schoolName: new FormControl('', Validators.required),
      schoolType: new FormControl('', Validators.required),
      schoolLocation: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(7), Validators.pattern(/^[+-]?\d+$/)]),
    });

    this.schoolFundForm = this.formBuilder.group({
      aboutSchoolFunds: new FormControl('', Validators.required),
      staffPoints: new FormControl(true),
    });

    this.aboutOwnerForm = this.formBuilder.group({
      fullName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(14), Validators.pattern(/^[+-]?\d+$/)]),
    });

    this.schoolExposureForm = this.formBuilder.group({
      schoolDescription: new FormControl('', Validators.required),
      schoolAchievement: new FormControl('', Validators.required),
    });
  }

  async ionViewDidEnter() { }

  async nextStep(ev) {
    if (this.stepCount < 2) {
      this.stepCount = this.stepCount + 1;
      this.onStpes();
    }
    else {
      this.utilService.showLoading();
      let params: any = {
        mobileNumber: this.aboutOwnerForm.value.mobileNumber,
        email: "schoolPWA@gmail.com",
        countryCode: 57
      }
      this.addSchoolQuery
        .mutate(
          {
            sendSms: {
              ...params,
            }
          },
        ) .subscribe(
          ({ data }) => {
            console.log("got data", data);
          },
          error => {
            console.log("there was an error sending the query " + error);
          }
        );
      // let query = this.authenticationService.sendOTP(params);
      // console.log(query)
      // this.apollo.query({ query })
      //   .subscribe(async (data: any) => {
      //     console.log(data)
      //     if (data.errors) {
      //       this.utiService.error(data.errors);
      //     }
      //     else {
      //       this.utiService.presentToast(data.message);
      //       const formData = { ...this.aboutSchoolForm.value, ...this.schoolFundForm.value, ...this.aboutOwnerForm.value, ...this.schoolExposureForm.value };
      //       this.authyId = data.authyId;
      //       const modalOption: any = {
      //         component: OtpVerificationComponent,
      //         backdropDismiss: false,
      //         componentProps: {
      //           data: formData,
      //           authyId: data.authyId,
      //           ev: ev
      //         },
      //       };
      //       const modal = await this.modalCtrl.create(modalOption);
      //       modal.onDidDismiss().then(async (res) => {
      //         if (res.data == 'verified') {
      //           this.stepCount = this.stepCount + 1;
      //           this.onStpes();
      //         }
      //       });
      //       return await modal.present();
      //     }
      //   },
      //     error => {
      //       this.utiService.error(error);
      //     })
      // await this.authenticationService.sendOTP(params)
      //   .subscribe(
      //     async (data: any) => {
      //       if (data.success == true) {
      //         this.utiService.presentToast(data.message);
      //         const formData = { ...this.aboutSchoolForm.value, ...this.schoolFundForm.value, ...this.aboutOwnerForm.value, ...this.schoolExposureForm.value };
      //         this.authyId = data.authyId;
      //         const modalOption: any = {
      //           component: OtpVerificationComponent,
      //           backdropDismiss: false,
      //           componentProps: {
      //             data: formData,
      //             authyId: data.authyId,
      //             ev: ev
      //           },
      //         };
      //         const modal = await this.modalCtrl.create(modalOption);
      //         modal.onDidDismiss().then(async (res) => {
      //           if (res.data == 'verified') {
      //             this.stepCount = this.stepCount + 1;
      //             this.onStpes();
      //           }
      //         });
      //         return await modal.present();
      //       }
      //       else {
      //         this.utiService.error(data.message);
      //       }
      //     },
      //     error => {
      //       if (error.error == undefined) {
      //         this.utiService.error(error);
      //       } else { this.utiService.error(error.error); }
      //     });
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
  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      let name = event.target.files[0].name;
      let reader = new FileReader();
      reader.onload = (_event) => {
        this.image = reader.result;
      }
      let params = { value: event.target.files[0], filename: name }
      this.schoolExposureForm.value.photo = params;

      this.imageData = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async onSubmit() {
    let loading = await this.loadingCtrl.create({
      message: "Creating school please wait..."
    });
    loading.present();
    let formData = new FormData();
    formData.append('photo', this.imageData);
    formData.append('schoolName', this.aboutSchoolForm.value.schoolName);
    formData.append('schoolType', this.aboutSchoolForm.value.schoolType);
    formData.append('schoolLocation', this.aboutSchoolForm.value.schoolLocation);
    formData.append('aboutSchoolFunds', this.schoolFundForm.value.aboutSchoolFunds);
    formData.append('staffPoints', this.schoolFundForm.value.staffPoints);
    formData.append('fullName', this.aboutOwnerForm.value.fullName);
    formData.append('mobileNumber', this.aboutOwnerForm.value.mobileNumber);
    formData.append('schoolDescription', this.schoolExposureForm.value.schoolDescription);
    formData.append('schoolAchievement', this.schoolExposureForm.value.schoolAchievement);
    formData.append('authyId', this.authyId);

    // const params = { ...this.aboutSchoolForm.value, ...this.schoolFundForm.value, ...this.aboutOwnerForm.value, ...this.schoolExposureForm.value, ...id };
    await this.schoolService.addSchool(formData)
      .subscribe((data: any) => {
        if (data.success == true) {
          this.utiService.presentToast(data.message);
          this.router.navigate(['/school', data.data._id]);
          loading.dismiss();
        }
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
      { type: 'required', message: 'School name is required.' },
    ],
    'schoolType': [
      { type: 'required', message: 'School type is required.' },
    ],
    'schoolLocation': [
      { type: 'required', message: 'Zip Code is required.' },
      { type: 'pattern', message: 'Invalid Input only numbers allowed for the Zip Code.' },
      { type: 'minLength', message: 'Phone number  Min 5 digit.' },
      { type: 'maxLength', message: 'Phone number  Max 7 digit.' }
    ],
    'aboutSchoolFunds': [
      { type: 'required', message: 'School funds field is required.' },
    ],
    'fullName': [
      { type: 'required', message: 'Full name is required.' },
    ],
    'mobileNumber': [
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'pattern', message: 'Invalid Input only numbers allowed for the mobile number.' },
      { type: 'minLength', message: 'Phone number  Min 10 digit.' },
      { type: 'maxLength', message: 'Phone number  Max 10 digit.' }
    ],
    'schoolDescription': [
      { type: 'required', message: 'School Description field is required.' },
    ],
    'schoolAchievement': [
      { type: 'required', message: 'School Achievement field is required.' },
    ],
  }
}
