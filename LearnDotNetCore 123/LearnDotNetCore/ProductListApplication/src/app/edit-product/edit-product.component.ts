import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productform: this.formBuilder.group({
        Name: ['', Validators.required],
        Price: ['', Validators.required],
      }),
    });

    // Fetch product details and populate the form if needed
    this.route.params.subscribe(params => {
      this.productId = +params['id']; // Get the product ID from the URL
      if (this.productId) {
        this.fetchProductDetails(this.productId); // Fetch product details if the ID is available
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value.productform;
      const updatedProduct = { ...formData, id: this.productId };

      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.put<any>(`http://localhost:5115/api/Product/${this.productId}`, updatedProduct, { headers })
        .subscribe({
          next: (response) => {
            console.log('Product updated successfully:', response);
            // Redirect to the product details page or any other page
          },
          error: (error: any) => {
            console.error('Error updating product:', error);
            // Handle error
          }
        });
    }
  }

  fetchProductDetails(productId: number) {
    this.http.get<any>(`http://localhost:5115/api/Product/${productId}`)
      .subscribe({
        next: (data) => {
          this.productForm.patchValue({ // Set form values using patchValue
            productform: {
              Name: data.name,
              Price: data.price
            }
          });
        },
        error: (error: any) => {
          console.error('Error fetching product details:', error);
        }
      });
  }
}
