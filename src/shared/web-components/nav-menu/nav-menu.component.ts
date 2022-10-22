import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/bar.model';
import { MenuLinks } from 'src/app/models/menu-links.model';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  constructor(private productsService: ProductsService) { }
  navMenuLinks:MenuLinks[]=[]
  menuCategories:Category[]=[]
  ngOnInit() {
    this.getMenuCategories();
  }
  /**
   *Get category data from service and create nav-menu links.
  */
  getMenuCategories():Category[]{
    this.productsService.getCategories().subscribe({
      next:(res)=>{
        res.categories.forEach(category =>{
          this.menuCategories.push(category);
          this.navMenuLinks.push(
            {
              label:category.name,
              link: '/category/' + category.name.toLowerCase().split(' ').join('-').split('/').join('')
            }
          )
        });
      }
    });
    return this.menuCategories;
  }

}
