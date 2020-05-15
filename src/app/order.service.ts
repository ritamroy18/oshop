import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }


  async placeOrder(order) {
    const result =  this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('orders').snapshotChanges()
      .pipe(map(response => {
        return response.map(element => {
          const orders = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          orders['$key'] = element.key;
          return orders;
        });
      }));
  }

  getOrdersByUser(userId: string) {
    return this.db.list('orders/', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges()
      .pipe(map(response => {
        return response.map(element => {
          const orders = element.payload.toJSON();
          // tslint:disable-next-line: no-string-literal
          orders['$key'] = element.key;
          return orders;
        });
      }));
  }
}
