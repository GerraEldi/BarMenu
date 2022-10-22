import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/bar.model';
import { MenuLinks } from 'src/app/models/menu-links.model';
import { ThemeService } from 'src/app/themes/theme.service';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
    private themeService: ThemeService
  ) { }
  navMenuLinks: MenuLinks[] = [];
  ngOnInit() {
    this.getMenuCategories();
  }
  /**
   *Get category data from service and create nav-menu links.
  */
  getMenuCategories(): void {
    this.productsService.getCategories().subscribe({
      next: (res) => {
        res.categories.forEach(category => {
          this.navMenuLinks.push(
            {
              label: category.name,
              /**
         * the string methods applied to category name are made to format the name of the categories in the json file before setting them as a path
         * the empty spaces are replaced with "-" and the extra "/" are removed so we don't receive path errors
         * for example "Food Menu/Snacks" will be formatted into "food-menu-snacks"
         */
              link: '/category/' + category.name.toLowerCase().split(' ').join('-').split('/').join('')
            }
          )
        });
      },
      error(err) {
        console.log(err);
      }
    });
  }
  toggle() {
    const active = this.themeService.getActiveTheme();
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }

}
