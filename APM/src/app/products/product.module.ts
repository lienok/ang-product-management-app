import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { ProductData } from 'src/api/products/product-data';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent
  ],
  imports: [
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', canActivate: [ProductDetailGuard], component: ProductDetailComponent },
      { path: 'products/:id/edit', component: ProductEditComponent },
    ]),
    SharedModule
  ]
})
export class ProductModule { }
