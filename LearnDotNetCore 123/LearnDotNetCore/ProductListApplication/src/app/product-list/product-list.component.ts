import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
 // Import your ProductService

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  addProduct() {
    this.router.navigate(['/add-product']);
  }

  editProduct(productId: any) {
    // Navigate to the edit product page with the product ID
    this.router.navigate(['/edit-product', productId]);
  }

  deleteProduct(productId: any) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService['deleteProduct'](productId).subscribe(() => {
        this.products = this.products.filter(product => product.id !== productId);
      });
    } else {
      console.log('Deletion canceled by user.');
    }
  }

  fetchProducts() {
    this.http.get<any[]>('http://localhost:5115/api/Product')
      .subscribe({
        next: (data) => {
          console.log(data);
          this.products = data;
        },
        error: (error: any) => {
          console.error('Error fetching products:', error);
        }
      });
  }
}
