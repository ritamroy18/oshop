import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { CategoryService } from 'src/app/category.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCartItem } from '../models/shopping-cart-items';
import { ShoppingCart } from '../models/shopping-cart';

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
