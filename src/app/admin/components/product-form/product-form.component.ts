import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { FormBuilder ,FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  //  If we use class only constructor for tht reason we use observable variable
  categories$;
  editProductId:any;
  constructor(
    private categoryService:CategoryService,
    private productService:ProductService,
    public formBuilder: FormBuilder,
    private router:Router,
    private _activatedRoute:ActivatedRoute
    ) { 
    this.categories$ = categoryService.getCategories();
  }
  
  public showErrorTitle: boolean = false;
  public showErrorPrice: boolean = false;
  public showErrorCategory: boolean = false;
  public showErrorImageUrl: boolean = false;

  productCreateTitleValidationError: string = 'Please enter title';  
  productCreatePriceValidationError: string = 'Please enter price.Value should be 0 or higher than 0 ';  
  productCreateCategoryValidationError: string = 'Please enter category';
  productCreateImageUrlValidationError: string = 'Please enter image url';


  public addProductFormGroup: FormGroup = this.formBuilder.group({
    'title': ['', [Validators.required]],
    'price': ['', [Validators.required, Validators.pattern(/^[0-9]/)]],
    'category': ['', [Validators.required]],
    'imageUrl': ['', [Validators.required, Validators.pattern(/^(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/)]],
  });


  ngOnInit(): void {
    this._activatedRoute.params.subscribe(param => {
      if(typeof param.id !== 'undefined' && param.id != null) {
        this.editProductId = param.id;
        console.log(this.editProductId);
        this.productService.getEditProduct(this.editProductId).subscribe(resp=>{
          //console.log(resp);
          let data =resp;
          if(resp){
            this.addProductFormGroup.controls['title'].setValue(data['title'])
            this.addProductFormGroup.controls['price'].setValue(data['price'])
            this.addProductFormGroup.controls['category'].setValue(data['category'])
            this.addProductFormGroup.controls['imageUrl'].setValue(data['imageUrl'])

          }
        })
      }
    })
  }

  ProductFormSubmitted(){
    if(this.editProductId) { 
      console.log('2');
      this.editProduct();
    }
    else { // Edit CMS Page
      console.log('1');
      this.addProduct();
    }
  }

  addProduct(){
    // console.log(product);
    let errValidation = false;

    if(this.addProductFormGroup.controls['title'].invalid) {
      this.showErrorTitle = true;
      errValidation = true;
    }
    else {
      this.showErrorTitle = false;
    }

    if(this.addProductFormGroup.controls['price'].invalid) {
      this.showErrorPrice = true;
      errValidation = true;
    }
    else {
      this.showErrorPrice = false;
    }

    if(this.addProductFormGroup.controls['category'].invalid) {
      this.showErrorCategory = true;
      errValidation = true;
    }
    else {
      this.showErrorCategory = false;
    }

    if(this.addProductFormGroup.controls['imageUrl'].invalid) {
      this.showErrorImageUrl = true;
      errValidation = true;
    }
    else {
      this.showErrorImageUrl = false;
    }

    if(!!errValidation) {
      return false;
    }
    else{
      this.productService.create(this.addProductFormGroup.value);
      this.router.navigate(['/admin/products']);
    }

  }

  editProduct(){
    this.productService.updateProduct(this.editProductId,this.addProductFormGroup.value)
    this.router.navigate(['/admin/products']);

  }


  delete(){
    if(confirm('Are you sure you want to delete this product?')){
      this.productService.deleteProduct(this.editProductId);
      this.router.navigate(['/admin/products']);
    }
  }

}