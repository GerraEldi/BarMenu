import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Product } from 'src/app/models/bar.model';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  productsList!: Product[];
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let categoryName = params.get("name");
      console.log(categoryName);
      this.filterProductsByCategory(categoryName);
    })

  }

  filterProductsByCategory(categoryName: string | null): void {
    this.productsService.getCategories().subscribe({
      next: (res) => {
        let filteredResults = res.categories.filter((category: Category) => {
          return category.name.toLowerCase().split(' ').join('-').split('/').join('') == categoryName;
        })
        this.productsList = filteredResults[0].products;
      }, error(err) {
        console.log(err);
      }
    })
  }

}
