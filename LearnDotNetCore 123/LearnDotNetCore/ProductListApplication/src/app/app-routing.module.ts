import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';

export const routes: Routes = [
  { path: 'product-list', component: ProductListComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-product', component: EditProductComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'delete-product', component: DeleteProductComponent },
  { path: 'delete-product/:id', component: DeleteProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
