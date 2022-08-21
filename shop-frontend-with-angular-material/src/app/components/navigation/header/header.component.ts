import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../../ui/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem: number = 0;
  loginStatus$: Observable<boolean>;
  
  @Output() public sidenavToggle = new EventEmitter();
  
  constructor(public dialog: MatDialog, 
              public userService: UserService, 
              private cartService: CartService) { }

  ngOnInit(): void {
    this.loginStatus$ = this.userService.isLoggedIn;

    this.cartService.getProducts().subscribe(response => {
      this.totalItem = response.length;
    });
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
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
