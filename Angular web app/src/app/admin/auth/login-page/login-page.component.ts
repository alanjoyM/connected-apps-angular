import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/common-ui-helpers/password-validator';
import { User } from 'src/app/common-ui-models/user';
import { AuthService } from '../auth.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],

})


export class LoginPageComponent {

  loginPage:boolean=true;
  signupPage:boolean=false;

  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  constructor(private authService: AuthService, private snackBar: MatSnackBar,private router: Router) {

  }
  signUpForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]),
    lastName: new FormControl(null, [Validators.required, Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required])
  },
    { validators: CustomValidators.passwordsMatching }
  );

  loginForm = new FormGroup({
    userEmail: new FormControl(null, [Validators.required, Validators.email]),
    loginPassword: new FormControl(null, [Validators.required])
  });

  get fSignUp() {
    return this.signUpForm.controls
  }
  get fLogin() {
    return this.loginForm.controls
  }
  getControlSignup(name: any): AbstractControl | null {
    return this.signUpForm.get(name);
  }
  getControlLogin(name: any): AbstractControl | null {
    return this.loginForm.get(name);
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  ngOnInit() {
  }
  register() {
    if (!this.signUpForm.valid) {
      return;
    }
    else {
      const userdata = new User;
      userdata.firstName = this.signUpForm.get('firstName')?.value;
      userdata.lastName = this.signUpForm.get('lastName')?.value;
      userdata.email = this.signUpForm.get('email')?.value;
      userdata.password = this.signUpForm.get('password')?.value;




      this.authService.findUserByUserId(userdata.email).subscribe((response: User) => {
        if (response.errorCode === "NONE001") {
          console.log("User does not exists");
          this.authService.registerUser(this.signUpForm.value).subscribe(
            (registerdUser: User) => {
              console.log('result is', registerdUser);

              setTimeout(() =>
      this.formGroupDirective.resetForm(), 0)
              this.signUpForm.markAsUntouched;
              this.loginClicked();
              this.showSnackbarSuccess('User ' + registerdUser.firstName + ' ' + 'successfully registered', 'Close', 2000)
            },
            error => {
              console.log(error?.message);
            }
          );
        }
        else if (response.firstName && response.lastName) {
          console.log("User exists", response);
          this.showSnackbarFailure('User ' + response.email + ' ' + 'already exists', 'Close', 3000)
        }
        else if (response.errorMessage) {
          this.showSnackbarFailure(response.errorMessage, 'Close', 3000);
        }
      });
    }
  }

  login(){
    if (!this.loginForm.valid) {
      return;
    }
    else{
      const loginUser =new User();
      loginUser.email= this.loginForm.get('userEmail')?.value;
      loginUser.password = this.loginForm.get('loginPassword')?.value;
      this.authService.loginUser(loginUser).subscribe(result=>{
        if(result.firstName && result.lastName){
          console.log("user found. User is",result.firstName);
          this.showSnackbarSuccess('Login successfull.'+' '+'User'+' '+result.firstName+' '+'is now logged in.', 'Close', 3000)
          this.router.navigateByUrl('/dashboard')
        }
        else if(result.errorCode=="NONE002" && result.errorMessage){
          console.log(result.errorMessage);
          this.showSnackbarFailure(result.errorMessage, 'Close', 3000);
        }
      })
    }
  }
  showSnackbarSuccess(content: any, action: any, duration: number) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: ["custom-style-succ"],
      verticalPosition: this.verticalPosition,
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
  showSnackbarFailure(content: any, action: any, duration: number) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: ["custom-style-fail"],
      verticalPosition: this.verticalPosition,
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
  get firstName(): FormControl {
    return this.signUpForm.get('firstName') as FormControl;
  }
  get lastName(): FormControl {
    return this.signUpForm.get('lastName') as FormControl;
  }
  get email(): FormControl {
    return this.signUpForm.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.signUpForm.get('password') as FormControl;
  }
  get passwordConfirm(): FormControl {
    return this.signUpForm.get('passwordConfirm') as FormControl;
  }

  get userEmail():FormControl{
    return this.loginForm.get('userEmail') as FormControl
  }
  get loginPassword():FormControl{
    return this.loginForm.get('loginPassword') as FormControl
  }


  SignupClicked(){
    this.loginPage=false;
    this.signupPage=true;
  }
  loginClicked(){
    this.loginPage=true;
    this.signupPage=false;
  }
}
