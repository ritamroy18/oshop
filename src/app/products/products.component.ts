import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { CategoryService } from 'src/app/category.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  // products$;
  products: any[] = [];
  filteredProducts: any[] = [];
  // categories$;
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    // private categoryService:CategoryService,
    private shoppingCartService: ShoppingCartService,
    activatedRoute: ActivatedRoute
  ) {
    productService
      .getAll()
      .pipe(
        switchMap((products: Product[]) => {
          this.products = products;
          return activatedRoute.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .valueChanges().
      subscribe(cart => {
        this.cart = cart;
        // console.log(this.cart)
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
