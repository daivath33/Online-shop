import { SignupComponent } from './components/ui/signup/signup.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { CategoryListComponent } from './components/admin/category-list/category-list.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { NotFoundComponent } from './components/error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './components/error-pages/server-error/server-error.component';
import { ShoppingCartComponent } from './components/pages/shopping-cart/shopping-cart.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { LoginComponent } from './components/ui/login/login.component';
import { AuthGuard } from './_guards/auth-guard';
import { RoleGuard } from './_guards/role-guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'menu', component: ProductsComponent},
  { path: 'product/details', component: ProductDetailsComponent},
  { path: 'shopping/cart', component: ShoppingCartComponent},
  { path: 'product/list', canActivate: [AuthGuard, RoleGuard], component: ProductListComponent},
  { path: 'category/list', canActivate: [AuthGuard, RoleGuard], component: CategoryListComponent},
  { path: 'user/list', canActivate: [AuthGuard, RoleGuard], component: UserListComponent},
  { path: 'product/details/:id', component: ProductDetailsComponent },
  { path: '404', component: NotFoundComponent}, 
  { path: '500', component: ServerErrorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
