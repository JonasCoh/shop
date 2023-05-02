import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutComponent } from '../components/layout/layout.component';
import { NavComponent } from '../components/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { RegisterTwoComponent } from '../pages/register-two/register-two.component';
import { AlertComponent } from '../components/alert/alert.component';
import { ProductsUserComponent } from '../pages/products-user/products-user.component';
import { ProductsAdminComponent } from '../pages/products-admin/products-admin.component';
import { FormUpdateComponent } from '../components/form-update/form-update.component';
import { FormAddComponent } from '../components/form-add/form-add.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { CategoryPipe } from '../pipes/category.pipe';
import { CategoriesNavComponent } from '../components/categories-nav/categories-nav.component';
import { AdminModule } from './admin.module';
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';
import { ProductModalComponent } from '../components/product-modal/product-modal.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductCartCardComponent } from '../components/product-cart-card/product-cart-card.component';
import { SearchProductComponent } from '../components/search-product/search-product.component';
import { CartPriceComponent } from '../components/cart-price/cart-price.component';
import { OrderComponent } from '../pages/order/order.component';
import { FormOrderComponent } from '../components/form-order/form-order.component';
import { SuccessfulOrderComponent } from '../pages/successful-order/successful-order.component';


@NgModule({
  declarations: [


    LayoutComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    RegisterTwoComponent,
    AlertComponent,
    ProductsUserComponent,
    ProductsAdminComponent,
    FormUpdateComponent,
    FormAddComponent,
    ProductCardComponent,
    CategoryPipe,
    CategoriesNavComponent,
    ProductModalComponent,
    ProductListComponent,
    ProductCartCardComponent,
    SearchProductComponent,
    CartPriceComponent,
    OrderComponent,
    FormOrderComponent,
    SuccessfulOrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AdminModule,
    RouterModule,
    ReactiveFormsModule,
    RoutingModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
