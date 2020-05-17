import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  // tslint:disable-next-line: no-input-rename
  @Input('category')category;
  constructor(
    private categoryService: CategoryService,

  ) {
    this.categories$ = this.categoryService.getAll();

   }

  ngOnInit(): void {
  }

}
