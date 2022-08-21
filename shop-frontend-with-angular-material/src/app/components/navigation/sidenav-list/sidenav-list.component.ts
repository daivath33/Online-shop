import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../../ui/login/login.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  public totalItem: number = 0;
  loginStatus$: Observable<boolean>;
  @Output() sidenavClose = new EventEmitter();
  
  constructor(public dialog: MatDialog, 
              public userService: UserService, 
              private cartService: CartService) { }

  ngOnInit(): void {
    this.loginStatus$ = this.userService.isLoggedIn;
    this.cartService.getProducts().subscribe(response => {
      this.totalItem = response.length;
    });
  }

  onSidenavClose(){
    this.sidenavClose.emit();
  }

  loginUser(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(LoginComponent, dialogConfig).afterClosed().subscribe();
  }

  logoutUser(){
    this.userService.logout();
  }

}
