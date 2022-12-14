import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatBottomSheetModule,
    FlexLayoutModule
  ]
})
export class CategoryModule { }
