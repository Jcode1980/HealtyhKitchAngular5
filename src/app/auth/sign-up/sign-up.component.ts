import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user/user.service';
import {IUserSignUpCredentials} from '../../../models/IUserSignUpCredentials';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @Output() loginSuccessfull = new EventEmitter();
  form: FormGroup;
  private formSubmitAttempt: boolean;
  statusText: string = null;
  returnUrl: string;

  yearControl = new FormControl('', [Validators.required]);
  genderControl = new FormControl('', [Validators.required]);

  years = [];
  genders = [
    'Male',
    'Female'
  ];

  constructor(private fb: FormBuilder,
              private userService: UserService, private route: ActivatedRoute, public router: Router) {
  }

  // ngOnInit() {
  //   this.form = this.fb.group({
  //     email: ['', Validators.compose([
  //       Validators.email,
  //       Validators.required
  //     ])],
  //     password: ['', Validators.required],
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     birthYear: ['', Validators.required],
  //     gender: ['', Validators.required],
  //   });
  //   this.generateYears();
  // }

  ngOnInit() {

    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.email,
        Validators.required
      ])],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthYear: this.yearControl,
      gender: this.genderControl
    });
    this.generateYears();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  // async onSubmit() {
  //   if (this.form.valid) {
  //     const response = await this.authService.authenticate({
  //       email: this.form.get('email').value,
  //       password: this.form.get('password').value
  //     });
  //     if (!response.succeeded) {
  //       this.statusText = response.responseText;
  //     }
  //   }
  //   this.formSubmitAttempt = true;
  // }

  async onSubmit() {
    console.log("onSubmit called");
    if (this.form.valid) {
      console.log("sending user data");
      console.log(this.userSignUpObject());
      
      const response = await this.userService.registerUser(this.userSignUpObject());
      
      console.log("this is the response: " );
      console.log(response);
      
      if (!response.succeeded) {
        this.statusText = response['responseText'];
      }
      else{
        console.log(response);
        console.log("suceeded token is : "  + response['succeeded']);
        //this.loginSuccessfull.next();
        this.loginSuccessfull.emit("blah event");
        this.router.navigate([this.returnUrl]);
      }
    }
    else{
      console.log(this.form.getError);
      console.log("fields are not valid");
    }


  }    



  private userSignUpObject(): IUserSignUpCredentials {
    return {email: this.form.get('email').value,
      given: this.form.get('firstName').value,
      surname: this.form.get('lastName').value,
      yearOfBirth: this.form.get('birthYear').value,
      gender: this.form.get('gender').value,
      password: this.form.get('password').value,
    }
  }

  generateYears() {
    let currentYear = new Date().getFullYear();
    for (let i = (currentYear - 12); i >=  (currentYear - 90); i--) {
      this.years.push(i);
    }
  }

//   public findInvalidControls() {
//     const invalid = [];
//     const controls = this.AddCustomerForm.controls;
//     for (const name in controls) {
//         if (controls[name].invalid) {
//             invalid.push(name);
//         }
//     }
//     return invalid;
// }

}
