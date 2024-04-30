import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { JsonPipe, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgFor,
    ReactiveFormsModule,
    JsonPipe
 ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
