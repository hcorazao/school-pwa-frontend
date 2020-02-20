import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
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

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    public utilService: UtilService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController
  ) {

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
  nextStep() {
    this.stepCount = this.stepCount + 1;
    this.onStpes();
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
