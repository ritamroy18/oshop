import { ShoppingCartItem } from './shopping-cart-items';
import { Product } from './product';

export class ShoppingCart {

  public items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};
    // tslint:disable-next-line: forin
    for (const productId in itemsMap) {
      // this.items.push(itemsMap[productId]);
      const item = itemsMap[productId];
      // this.items.push(new ShoppingCartItem(item.product, item.quantity));
      // Object.assign(x, item);
      // x.$key = productId;
      this.items.push(new ShoppingCartItem({ ...item,  $key: productId }));
    }
  }

  getQuantity(product: Product) {
    // console.log('product', product)
    const item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    // tslint:disable-next-line: forin
    for (const productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
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
