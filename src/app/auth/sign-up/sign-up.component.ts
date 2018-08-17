import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;
  statusText: string = null;


  yearControl = new FormControl('', [Validators.required]);
  genderControl = new FormControl('', [Validators.required]);

  years = [];
  genders = [
    'Male',
    'Female'
  ];

  constructor(private fb: FormBuilder,
              private authService: UserService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.email,
        Validators.required
      ])],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthYear: ['', Validators.required],
      gender: ['', Validators.required],
    });
    this.generateYears();
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  async onSubmit() {
    if (this.form.valid) {
      const response = await this.authService.authenticate({
        email: this.form.get('email').value,
        password: this.form.get('password').value
      });
      if (!response.succeeded) {
        this.statusText = response.responseText;
      }
    }
    this.formSubmitAttempt = true;
  }

  generateYears() {
    for (let i = new Date().getFullYear(); i >= 1940; i--) {
      this.years.push(i);
    }
  }

}
