import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from '../shared/generic-validator';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, AfterViewInit {
  productForm!: FormGroup;
  product!: IProduct;
  sub!: Subscription;
  errorMessage: any;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private productService: ProductService, private router: Router) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      }
    }

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  ngAfterViewInit(): void {
    this.productForm.valueChanges.pipe(
      debounceTime(800)
    ).subscribe(() => this.displayMessage = this.genericValidator.processMessage(this.productForm))
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
      const p = { ...this.product, ...this.productForm.value };

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


