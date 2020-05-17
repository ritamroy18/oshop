import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('cart') cart: ShoppingCart;

  constructor() { }

  ngOnInit(): void {
  }

}
