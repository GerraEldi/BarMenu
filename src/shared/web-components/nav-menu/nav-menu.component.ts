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
  businessName!: string;
  nuis!: string;
  businessLogo!: string;
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
        this.businessName = res.businessName;
        this.nuis = res.nuis
        this.businessLogo = res.logo;
        res.categories.forEach(category => {
          this.navMenuLinks.push(
            {
              label: category.name.toUpperCase(),
              link: '/category/' + this.productsService.modifyString(category.name)
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
