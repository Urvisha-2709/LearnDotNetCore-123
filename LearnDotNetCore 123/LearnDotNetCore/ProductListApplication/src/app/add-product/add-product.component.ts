import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  productId: any; // Define the productId property here

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productform: this.formBuilder.group({
        Name: ['', Validators.required],
        Price: ['', Validators.required],
        id: ['', Validators.required],
      })
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.addProduct();
    } else {
      // Handle form validation errors, if any
      // You can display error messages or perform other actions
    }
  }

  addProduct() {
    const productData = this.productForm.value;
    const model = {
      name: productData.productform.Name,
      price: productData.productform.Price,
      id: productData.productform.id
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<any>('http://localhost:5115/api/Product', model, { headers })
      .subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          this.router.navigate(['/product-list']);
        },
        error: (error: any) => {
          console.error('Error adding product:', error);
          if (error.error && error.error.message) {
            alert(error.error.message);
          } else {
            alert('An error occurred while adding the product.');
          }
        }
      });
  }
}
