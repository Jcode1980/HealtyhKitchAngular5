import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user/user.service';
import { Router,  NavigationExtras,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  //@Output() loginSuccessfull = new EventEmitter<string>();
  @Output() loginSuccessfull = new EventEmitter();
  form: FormGroup;
  private formSubmitAttempt: boolean;
  statusText: string = null;
  
  private returnUrl:string;

  constructor(private fb: FormBuilder, private authService: UserService,
    private route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.email,
        Validators.required
      ])],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log("activated route is: " + this.returnUrl);
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  async loginAction() {
    if (this.form.valid) {
      const response = await this.authService.authenticate({
        email: this.form.get('email').value,
        password: this.form.get('password').value
      });
      
      
      if (!response.succeeded) {
        this.statusText = response.responseText;
      }
      else{
        console.log(response);
        console.log("suceeded token is : "  + response['succeeded']);
        //this.loginSuccessfull.next();
        this.loginSuccessfull.emit("blah event");
        this.router.navigate([this.returnUrl]);
      }
    }
    this.formSubmitAttempt = true;
  }

}
