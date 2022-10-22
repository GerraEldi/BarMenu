import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BillDetailsPopupModule } from 'src/shared/web-components/bill-details-popup/bill-details-popup.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatBottomSheetModule,
    BillDetailsPopupModule,
    FlexLayoutModule
  ]
})
export class CategoryModule { }
