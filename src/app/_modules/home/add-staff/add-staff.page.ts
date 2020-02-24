import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Motion } from '@capacitor/core';
import { SchoolService } from 'src/app/services/school.service';
@Component({
  selector: 'app-add-staff',
  templateUrl: 'add-staff.page.html',
  styleUrls: ['add-staff.page.scss'],
})
export class AddStaffPage {

  public staffForm: FormGroup;

  submitted = false;
  orientationType;
  constructor(
    private schoolService: SchoolService,
    private router: Router,
    public screenOrientation: ScreenOrientation,
    public utilService: UtilService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController
  ) {
    this.orientationType = this.screenOrientation.type;
    Motion.addListener('orientation', (event: OrientationType) => {
      let type: any = event;
      this.orientationType = type.srcElement.screen.orientation.type;
    })

  }

  ngOnInit() {
    this.staffForm = this.formBuilder.group({
      staffName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(14), Validators.pattern(/^[+-]?\d+$/)]),
      charlyPoints: new FormControl(true, Validators.required),
    });

  }
  async ionViewDidEnter() { }



  async onSubmit() {
    let loading = await this.loadingCtrl.create({
      message: "Creating staff please wait..."
    });
    loading.present();
    await this.schoolService.addStaff(this.staffForm.value)
      .subscribe(
        async data => {
          if (data.success == true) {
            this.utilService.presentToast(data.message);
            this.router.navigate(['qr-reader']);
          }
          console.log(data)
          loading.dismiss();
        },
        error => {
          loading.dismiss();
          if (error.error == undefined) {
            this.utilService.error(error);
          } else { this.utilService.error(error.error); }
        });
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
