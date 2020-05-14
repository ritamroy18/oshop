import { ShoppingCartItem } from './shopping-cart-items';

export class ShoppingCart {

  public items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    // tslint:disable-next-line: forin
    for (const productId in itemsMap) {
      // this.items.push(itemsMap[productId]);
      const item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }

  get totalItemsCount() {
    let count = 0;
    // tslint:disable-next-line: forin
    for (const productId in this.items) {
      count += this.items[productId].quantity;
    }
    return count;
    // console.log(count);
  }
}
