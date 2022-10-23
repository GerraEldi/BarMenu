import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, OrderedProduct, Product } from 'src/app/models/bar.model';
import { ProductsService } from 'src/services/products.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  productsList!: Product[];
  orderedProducts: OrderedProduct[] = [];
  totalPrice: number = 0;
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
  /**
   * Displays the list of products on the grid, filtered from the json file by the category name received from the route param subscription.
   */
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
  /**
   * Gets the ordered product and adds it to the array of ordered products.
   */
  orderProducts(selectedProduct: Product): void {
    this.bottomSheet.open(this.TemplateBottomSheet);
    let index = -1;
    if (this.orderedProducts.length != 0) {
      for (let i = 0; i < this.orderedProducts.length; i++) {
        if (this.orderedProducts[i].name == selectedProduct.name) {
          index = i;
        }
      }
      if (index > -1) {
        this.orderedProducts[index] = {
          name: this.orderedProducts[index].name,
          price: this.orderedProducts[index].price += selectedProduct.unitPrice,
          quantity: this.orderedProducts[index].quantity += 1
        };
      } else {
        this.orderedProducts.push({
          name: selectedProduct.name,
          price: selectedProduct.unitPrice,
          quantity: 1
        })
      }
    } else {
      this.orderedProducts.push(
        {
          name: selectedProduct.name,
          price: selectedProduct.unitPrice,
          quantity: 1
        }
      );
    }
    this.getTotalPrice(this.orderedProducts);
    console.log(this.orderedProducts);
    console.log(this.totalPrice);
  }
  /**
   * Receives the ordered products array and calculates the total price of products.
   */
  getTotalPrice(orderedProducts: OrderedProduct[]): number {
    this.totalPrice = 0;
    orderedProducts.forEach(product => {
      this.totalPrice += product.price;
    });
    return this.totalPrice;
  }
  onSubmit() {
    this.orderedProducts = [];
  }

  closeTemplateSheetMenu() {
    this.bottomSheet.dismiss();
  }
  /**
   * Generates random colors for each product card.
   */
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
