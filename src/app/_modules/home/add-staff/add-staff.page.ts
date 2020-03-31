import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Motion } from '@capacitor/core';
import { SchoolService } from 'src/app/services/school.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-add-staff',
  templateUrl: 'add-staff.page.html',
  styleUrls: ['add-staff.page.scss'],
})
export class AddStaffPage {

  public staffForm: FormGroup;

  submitted = false;

  orientationType;

  schoolId;

  constructor(
    private schoolService: SchoolService,
    private router: Router,
    public screenOrientation: ScreenOrientation,
    public utilService: UtilService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public activatedRoute: ActivatedRoute,
    private apollo: Apollo,
  ) {

    this.orientationType = this.screenOrientation.type;
    Motion.addListener('orientation', (event: OrientationType) => {
      let type: any = event;
      this.orientationType = type.srcElement.screen.orientation.type;
    })
    this.activatedRoute.params.subscribe(params => {
      this.schoolId = params.id;
    });
  }

  ngOnInit() {
    this.staffForm = this.formBuilder.group({
      staffName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(14), Validators.pattern(/^[+-]?\d+$/)]),
      charlyPoints: new FormControl(true, Validators.required),
      schoolId: new FormControl('')
    });
    this.staffForm.get('schoolId').setValue(this.schoolId);
  }

  async ionViewDidEnter() { }

  async onSubmit() {
    let loading = await this.loadingCtrl.create({
      message: "Creating staff please wait..."
    });
    loading.present();

    this.apollo.mutate<any>({
      mutation: gql`mutation{
        addStaff(
          schoolId: "${this.schoolId}",
          staffName: "${this.staffForm.value.staffName}",
          charlyPoints: ${this.staffForm.value.charlyPoints},
          mobileNumber: "${this.staffForm.value.mobileNumber}"
        ){
          _id
          schoolId
          staffName 
          charlyPoints
          mobileNumber
        }
      }`,

    }).subscribe(async (schoolRes) => {
      this.utilService.presentToast('Staff Added Successfully!');
      this.router.navigate(['/staff-directory', this.schoolId]);
      loading.dismiss();
    })
    
  }

  validation_messages = {
    'staffName': [
      { type: 'required', message: 'Staff name is required.' },
    ],
    'mobileNumber': [
      { type: 'required', message: 'Mobile number is required.' },
      { type: 'pattern', message: 'Invalid Input only numbers allowed for the mobile number.' },
      { type: 'minLength', message: 'Phone number  Min 10 digit.' },
      { type: 'maxLength', message: 'Phone number  Max 10 digit.' }
    ]
  }
}
