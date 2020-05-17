import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges()
      .pipe(
        map(response => {
          return response.map(element => {
            const products = element.payload.toJSON();
            // tslint:disable-next-line: no-string-literal
            products['$key'] = element.key;
            return products;
          });
        })
      );
  }

  getEditProduct(productId) {
    return this.db.object('products/' + productId).snapshotChanges()
      .pipe(
        map(response => {
          const author = response.payload.toJSON();
          // console.log(author);
          // tslint:disable-next-line: no-string-literal
          author['$key'] = response.key;
          return author;
        })
      );
  }

  updateProduct(productId, product) {
    return this.db.object('products/' + productId).update(product);
  }

  deleteProduct(productId) {
    return this.db.object('products/' + productId).remove();
  }


}
