import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-school',
  templateUrl: 'school.page.html',
  styleUrls: ['school.page.scss'],
})
export class SchoolPage {

  title = 'School name';

  image:any;

  constructor(
    private router: Router,
    public utilService: UtilService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
   
  }
  async ionViewDidEnter() {

  }

  back() {
   
  }
}
