import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from "rxjs/operators";
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  // products$;
  products: any[];
  filteredProducts: any[];
  subscription: Subscription

  constructor(private productService: ProductService, public db: AngularFireDatabase) {
    // this.products$ = this.productService.getAll();
    this.subscription = this.productService
      .getAll()
      .subscribe(products => {
        console.log(products);
        this.filteredProducts = this.products = products;
        console.log(this.filteredProducts)
      });

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  filter(query: string) {
    console.log(query);
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products
  }
}
