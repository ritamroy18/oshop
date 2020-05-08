import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { CategoryService } from 'src/app/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  // products$;
  products: any[]= [];
  filteredProducts: any[]= [];

  // categories$;
  category:string;
  constructor(
    private productService:ProductService,
    // private categoryService:CategoryService,
     activatedRoute:ActivatedRoute
    ) { 
    //  It works as nested observable
    this.productService.
    getAll().
    subscribe(products=>{
      this.products = products; //get all products
      //then call filter
      activatedRoute.queryParamMap.subscribe(params => {
        this.category = params.get('category');
  
        this.filteredProducts = (this.category)?
        this.products.filter(p => p.category === this.category):
        this.products
      })
    });
    // this.categories$ = this.categoryService.getAll();
  }

  ngOnInit(): void {
  }

}
