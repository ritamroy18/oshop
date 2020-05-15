import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  async addToCart(product: Product) {
    this.updateItem(product, 1);
    // this.updateItem(product, 1);

  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
      // tslint:disable-next-line: no-string-literal
      .pipe(map(x => new ShoppingCart(x.payload.toJSON()['items'])));
  }


  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }
    // elsepart
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  // private async updateItemQuantity(product: Product, change: number) {
    private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe(async (item: any) => {
        const quantity = (item ? item.quantity : 0) + change ;
        if (quantity === 0) { item$.remove(); } else {
          item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity
          });
        }
      });

    // tslint:disable-next-line: no-shadowed-variable
    // const cartId = await this.getOrCreateCartId();
    // // tslint:disable-next-line: no-shadowed-variable
    // const item$ = this.getItem(cartId, product.$key);
    // item$.snapshotChanges()
    //   .pipe(take(1))
    //   .pipe(map(response => {
    //     // tslint:disable-next-line: no-shadowed-variable
    //     const item = response.payload.toJSON();
    //     return item as any;
    //   }))
    //   // tslint:disable-next-line: no-shadowed-variable
    //   .subscribe(item => {
    //     const quantity = (item.quantity || 0) + change;

    //     const { $key, ...rest } = product;
    //     // item$.update({ product: { ...rest }, quantity: (item ? item.quantity : 0) + change });
    //     item$.update({
    //       title: product.title,
    //       imageUrl: product.imageUrl,
    //       price: product.price,
    //       quantity: (item ? item.quantity : 0) + change
    //      });

    //   });
  }
}
