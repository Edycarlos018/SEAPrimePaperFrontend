import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product;

  editProductForm: FormGroup;
  constructor(private _form: FormBuilder,
              private _productService: ProductsService,
              private _ar: ActivatedRoute,
              private _router: Router) { 

        this._ar.paramMap.subscribe(p => {
          this._productService.getProduct(p.get('id')).subscribe((singleProduct: Product) => {
            this.product = singleProduct;
            this.createForm();
          })
        })
              }

  ngOnInit() {
  }
  createForm(){
    this.editProductForm = this._form.group({
      ProductEntityId: new FormControl(this.product.productEntityId),
      ProductName: new FormControl(this.product.productName),
      Description: new FormControl(this.product.description),
      Price: new FormControl(this.product.price)

    })
  }

  onSubmit(form) {
    const updateProduct: Product = {
      productEntityId: form.value.ProductEntityId,
      productName: form.value.ProductName,
      description: form.value.Description,
      price: form.value.Price
    }
    this._productService.updateProduct(updateProduct).subscribe(d => {
      this._router.navigate(['/products']);
    })
  }
}
