import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { RegisterTwoComponent } from '../pages/register-two/register-two.component';
import { ProductsUserComponent } from '../pages/products-user/products-user.component';
import { ProductsAdminComponent } from '../pages/products-admin/products-admin.component';
import { OrderComponent } from '../pages/order/order.component';
import { SuccessfulOrderComponent } from '../pages/successful-order/successful-order.component';



const routes: Routes = [
  // { path: "home", component: MainComponent },
  // { path: "products", canActivate: [LoginGuardService], component: ProductsComponent },
  // { path: "users", canActivate: [LoginGuardService], component: UsersComponent },
  // { path: "add-user", canActivate: [LoginGuardService], component: AddUserComponent },
  // { path: "about", component: AboutComponent },
  { path: "register", component: RegisterComponent },
  { path: "register/2", component: RegisterTwoComponent },
  { path: "products/user", component: ProductsUserComponent },
  {
    path: "products/admin",
    loadChildren:() => import("../module/admin.module").then(m=>m.AdminModule)
  },
  { path: "order/user", component: OrderComponent },
  { path: "login", component: LoginComponent },
  { path: "order/user/successful", component: SuccessfulOrderComponent },
  // { path: "admin", loadChildren: "./admin.module#AdminModule"},
  // { path: "contact-us", component: ContactUsComponent },
  // { path: "login", component: LoginComponent },
  { path: "", redirectTo: "login", pathMatch: "full" }, // pathMatch = התאמת המחרוזת הריקה לכלל הנתיב
  // { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) // Importing the above routes
  ]
})
export class RoutingModule {

}
