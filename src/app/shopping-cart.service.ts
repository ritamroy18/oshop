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

  public quantity
    : number;
  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCartAll(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .pipe(map((x: any) => new ShoppingCart(x.items)));
  }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
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

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    // const cartId = await this.getOrCreateCartId();
    // const item$ = this.getItem(cartId, product.$key);
    // item$
    //   .valueChanges()
    //   .pipe(take(1))
    //   .subscribe((item: any) => {
    //     if (item) { item$.update({ quantity: (item.quantity || 0) + change }); } else {
    //       item$.set({
    //         key: product.$key,
    //         category: product.category,
    //         title: product.title,
    //         imageUrl: product.imageUrl,
    //         price: product.price,
    //         quantity: 1
    //       });
    //     }
    //   });

    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);
    item$.snapshotChanges()
      .pipe(take(1))
      .pipe(map(response => {
        const item = response.payload.toJSON();
        return item as any;
      }))
      .subscribe(item => {
        const { $key, ...rest } = product;
        item$.update({ product: { ...rest }, quantity: (item ? item.quantity : 0) + change });
      });
  }
}
