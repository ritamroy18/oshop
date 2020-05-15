import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {


  constructor(private shoppingCartService: ShoppingCartService,
              private orderService: OrderService,
              private authService: AuthService,
              private router: Router
) { }

  userSubscription: Subscription;
  userId: string;
  // tslint:disable-next-line: no-input-rename
  @Input('cart') cart: ShoppingCart;

  shipping = {
    name : '',
    addressLine1: '',
    addressLine2 : '',
    city : ''
  };

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.shoppingCartService.clearCart();
    this.router.navigate(['/order-success', result.key]);
  }


}
