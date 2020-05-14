import { Product } from './product';

export class ShoppingCartItem {
  // $key: string;
  // category: string;
  // imageUrl: string;
  // price: number;
  // title: string;
  constructor(public product: Product , public quantity: number) {}

    get totalPrice() {
      console.log(this.product.price);
      return this.product.price * this.quantity;
     }
  }
