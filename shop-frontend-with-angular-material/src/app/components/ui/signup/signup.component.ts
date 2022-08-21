import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup;
  user: User = new User();
  
  constructor(private formBuilder: FormBuilder,
              private userService: UserService, 
              private dialogRef: MatDialogRef<SignupComponent>) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required, 
        Validators.pattern('^[A-Za-z]{3,20}$'),
       ]),
      lastName: new FormControl('',
       [
        Validators.required, 
        Validators.pattern('^[A-Za-z]{3,20}$'),
       ]),
      email: new FormControl('', [
        Validators.required, 
        Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+[.][A-Za-z]{2,}$'), 
       ]),
      password: new FormControl('', [
        Validators.required, 
        Validators.pattern('^[A-Za-z0-9]{4,8}$'),
        ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ])
    }, {
      validators: this.mustMatch('password', 'confirmPassword')
    }
    );
  }

 mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {       
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (confirmPasswordControl.errors && !confirmPasswordControl['MatchPassword']){
        return;
      }
      if (passwordControl.value !== confirmPasswordControl.value){
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
       confirmPasswordControl.setErrors(null);
      }
      return null;
    };
  }

  onSubmit(){
    if (this.userForm.invalid){
      return;
    } 
    const user: User = {...this.userForm.value}
    this.userService.addUser(user).subscribe({
      next:(res) => {
        alert("Successfully registration!");
        this.userForm.reset();
      }, error:()=>(
        alert("Sorry, something went wrong, please try again.")
      )
    });
    this.dialogRef.close('save');
  }

}
