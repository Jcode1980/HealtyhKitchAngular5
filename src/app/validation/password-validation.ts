import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag


        if(!AC.dirty){
            return null;
        }
          

        if (password.length < 5) {
            console.log('password is too short');
            AC.get('confirmPassword').setErrors({ PasswordTooShort: true })
        }
        else if (password != confirmPassword) {
            console.log('false');
            AC.get('confirmPassword').setErrors({ MatchPassword: true })
        }
        else {
            console.log('true');
            return null
        }
    }
}