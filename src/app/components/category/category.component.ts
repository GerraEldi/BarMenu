import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Product } from 'src/app/models/bar.model';
import { ProductsService } from 'src/services/products.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  productsList!: Product[];
  @ViewChild('templateBottomSheet')
  TemplateBottomSheet!: TemplateRef<any>;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private bottomSheet: MatBottomSheet
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
   openTemplateSheetMenu() {
    this.bottomSheet.open(this.TemplateBottomSheet);
  }

  closeTemplateSheetMenu() {
    this.bottomSheet.dismiss();
  }
   getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color);
    return color;
  }

}
