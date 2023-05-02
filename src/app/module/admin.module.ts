import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormUpdateComponent } from '../components/form-update/form-update.component';
import { FormAddComponent } from '../components/form-add/form-add.component';
import { ProductsAdminComponent } from '../pages/products-admin/products-admin.component';


const routes: Routes = [
    {
        path: "products/admin", component: ProductsAdminComponent, children: [
            { path: "insert", component: FormAddComponent },
            { path: "update", component: FormUpdateComponent },
        ]

    }
];

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes) // Importing the above routes
    ]
})
export class AdminModule {

}
