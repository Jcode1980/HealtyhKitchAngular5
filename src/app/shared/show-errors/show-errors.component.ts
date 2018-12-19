import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.scss']
})

export class ShowErrorsComponent {
  //@Input() testString: string;

  @Input()
  private control: AbstractControlDirective | AbstractControl;


  

 private static readonly errorMessages = {
   'required': () => '*required',
   'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
   'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
   'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
   'years': (params) => params.message,
   'countryCity': (params) => params.message,
   'uniqueName': (params) => params.message,
   'telephoneNumbers': (params) => params.message,
   'telephoneNumber': (params) => params.message
 };



 shouldShowErrors(): boolean {
   //return true;
   //console.log("errors are: ");
   //console.log(this.control);
   return this.control &&
     this.control.errors &&
     (this.control.dirty || this.control.touched);
 }

 private listOfErrors(): string[] {
   return Object.keys(this.control.errors)
     .map(field => this.getMessage(field, this.control.errors[field]));
 }

  firstError(): string{
    return this.listOfErrors()[0];
  }

 private getMessage(type: string, params: any) {
   return ShowErrorsComponent.errorMessages[type](params);
 }

}
