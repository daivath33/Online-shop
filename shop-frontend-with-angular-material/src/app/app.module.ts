import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { CategoryListComponent } from './components/admin/category-list/category-list.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { AddEditProductComponent } from './components/admin/add-edit-product/add-edit-product.component';
import { AddEditCategoryComponent } from './components/admin/add-edit-category/add-edit-category.component';
import { AddEditUserComponent } from './components/admin/add-edit-user/add-edit-user.component';
import { NotFoundComponent } from './components/error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './components/error-pages/server-error/server-error.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/ui/login/login.component';
import { SignupComponent } from './components/ui/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './components/pages/shopping-cart/shopping-cart.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { AuthGuard } from './_guards/auth-guard';
import { RoleGuard } from './_guards/role-guard';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    ProductListComponent,
    CategoryListComponent,
    UserListComponent,
    AddEditProductComponent,
    AddEditCategoryComponent,
    AddEditUserComponent,
    NotFoundComponent,
    ServerErrorComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ShoppingCartComponent,
    ProductDetailsComponent, 
    ProductsComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddEditCategoryComponent,
    AddEditProductComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class AppModule { }
