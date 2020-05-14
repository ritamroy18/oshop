import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories', ref =>
    ref.orderByChild('name')).snapshotChanges();
  }

  getAll() {
    return this.db.list('/categories').snapshotChanges()
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
}
