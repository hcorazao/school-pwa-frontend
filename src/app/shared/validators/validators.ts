import { FormControl, FormGroup } from '@angular/forms';

export class ValidatorsValues {

  static isValid(control: FormControl): any {
    let regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!regExp.test(control.value)) {
      return { "invalidEmail": true };
    }
    return null;
  }

  static isValidMobile(control: FormControl): any {
    let regExp = /^[0-9]{9,14}$/;

    if (!regExp.test(control.value)) {
      return { "invalidMobile": true };
    }
    return null;
  }


  static passwordMatch(password: string, confirmPassword: string): any {
    return (group: FormGroup): { [key: string]: any } => {
      let pass = group.controls[password];
      let cpass = group.controls[confirmPassword];

      if (pass.value === cpass.value) {
        return {
          "passwordNotMatch": true
        };
      }
      return null;
    }
  }

}

