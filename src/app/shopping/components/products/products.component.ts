import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { promise } from 'protractor';
import { resolve } from 'dns';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  // products$;
  products: any[] = [];
  filteredProducts: any[] = [];
  // categories$;
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    // private categoryService:CategoryService,
    private shoppingCartService: ShoppingCartService,
    private  activatedRoute: ActivatedRoute
  ) {

  }

  async ngOnInit() {
    // tslint:disable-next-line: no-shadowed-variable
    await new Promise((resolve) => setTimeout(resolve, 3000));
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService
    .getAll()
    .pipe(
      switchMap((products: Product[]) => {
        this.products = products;
        return this.activatedRoute.queryParamMap;
      })
    )
    .subscribe((params) => {
      this.category = params.get('category');
      this.applyFilter();

    });
  }

  private applyFilter() {
    this.filteredProducts = this.category
    ? this.products.filter((p) => p.category === this.category)
    : this.products;
  }


}
