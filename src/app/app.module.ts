import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavMenuComponent } from 'src/shared/web-components/nav-menu/nav-menu.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from 'src/services/products.service';
import { ThemeModule } from './themes/theme.module';
import { darkTheme } from './themes/dark-theme';
import { lightTheme } from './themes/light-theme';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatTabsModule,
    MatGridListModule,
    HttpClientModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light'
    })
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
