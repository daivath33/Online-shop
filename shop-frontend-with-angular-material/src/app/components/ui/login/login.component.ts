import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  email: string;
  password: string;
  user: User;

  constructor(private userService: UserService, 
              public dialog: MatDialog, 
              private dialogRef: MatDialogRef<LoginComponent>,
              private router: Router) { }

  ngOnInit(): void {}

  onSubmit(){
    this.userService.login(this.email, this.password).subscribe(data=>{
      this.user = data;
      alert("Login success!");
    });
      this.dialogRef.close();
  }
  
  signupUser(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(SignupComponent, dialogConfig).afterClosed().subscribe();
    this.dialogRef.close('login');
  }

}
