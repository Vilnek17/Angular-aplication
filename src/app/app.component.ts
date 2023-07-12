import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder } from '@angular/forms';

function passwordStrengthValidator(control: FormControl): { [key: string]: boolean }  {
  const value: string = control.value;
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasSymbol = /[@$!%*?&]/.test(value);

  
  if (hasLetter && hasDigit && hasSymbol) {
    return { 'strongStrength': true }; 
  } else if ((hasLetter && hasDigit) || (hasLetter && hasSymbol) || (hasDigit && hasSymbol)) {
    return { 'mediumStrength': true }; 
  } else {
    return { 'lowStrength': true }; 
  }
}

// function passwordColorValidator(control: FormControl): { [key: string]: boolean } {
//   const value: string = control.value;

//   if (!value || value.trim() === '') {
//     return { 'gray': true };
//   } else if (value.length < 8) {
//     return { 'red': true };
//   } else if (control.errors && control.errors['lowStrength']) {
//     return { 'red': true };
//   } else if (control.errors && control.errors['mediumStrength']) {
//     return { 'yellow': true };
//   } else if (control.errors && control.errors['strongStrength']) {
//     return { 'green': true };
//   } else {
//     return {};
//   }
// }
 



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, passwordStrengthValidator]],
      firstSection: [''],
      secondSection: [''],
      thirdSection: ['']
    });
  }

  isSectionEmpty(): boolean |null {
    const control = this.form.get('password');
    return control ? (!control.value || control.value.trim() === ''):true;
  }

  isPasswordLengthInvalid(): boolean {
    const passwordControl = this.form.get('password');
    const passwordValue = passwordControl?.value;
    return passwordValue ? (passwordValue.length < 8 ): true;
  }
  isPasswordEasyStrength(): boolean {
    const passwordControl = this.form.get('password');
    return passwordControl && passwordControl.errors && passwordControl.errors['lowStrength'];
  }
  
  isPasswordMediumStrength(): boolean {
    const passwordControl = this.form.get('password');
    return passwordControl && passwordControl.errors && passwordControl.errors['mediumStrength'];
  }

isPasswordStrongStrength(): boolean {
  const passwordControl = this.form.get('password');
  return passwordControl && passwordControl.errors && passwordControl.errors['strongStrength'];
}
}