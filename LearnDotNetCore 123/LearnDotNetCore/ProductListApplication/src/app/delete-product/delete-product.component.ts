import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  productId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
    });
  }

  onDelete() {
    if (this.productId) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.http.delete<any>(`http://localhost:5115/api/Product/${this.productId}`, { headers })
        .subscribe({
          next: (response) => {
            console.log('Product deleted successfully:', response);
            // Redirect or perform any other action upon successful deletion
            this.router.navigate(['/products-list']);
          },
          error: (error: any) => {
            console.error('Error deleting product:', error);
            // Handle error
          }
        });
    } else {
      console.error('Invalid product ID.');
    }
  }
}
