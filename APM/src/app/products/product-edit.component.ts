import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;
  product!: IProduct;
  sub!: Subscription;
  errorMessage: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private productService: ProductService, private router: Router) {
  }

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, 
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: [''],
      tags: this.fb.array([]),
      description: ''
    })

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = Number(params.get('id'));
        this.getProduct(id);
      }
    )
  }
  getProduct(id: number) {
    this.productService.getProduct(id)
      .subscribe({
        next: (product: IProduct) => this.displayProduct(product),
        error: err => this.errorMessage = err
      });
  }
  displayProduct(product: IProduct): void {
    // if (this.productForm) {
    //   this.productForm.reset();
    // }
    this.product = product;

    this.productForm.patchValue({
      productName: product?.productName,
      productCode: product?.productCode,
      startRating: product?.starRating,
      description: product?.description
    })
    //Update the data on the form
    this.productForm.setControl('tags', this.fb.array(product?.tags || []));
  }

  saveProduct(): void {
    if (this.productForm.dirty) {
      const p = {...this.product, ...this.productForm.value};

      this.productService.updateProduct(p).subscribe({
        next: () => this.onSaveComplete(),
        error: err => this.errorMessage = err
      })

    } else {
      this.onSaveComplete();
    }

  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      this.onSaveComplete();
    } else {
      this.productService.deleteProduct(this.product.id)
      .subscribe({
        next: () => this.onSaveComplete(),
        error: err => this.errorMessage = err
      })
    }
  }
  onSaveComplete() {
    this.productForm.reset();
    this.router.navigate(['/products']);
  }


}


