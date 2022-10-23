import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'category/mish&peshk', pathMatch: 'full' },
  {
    path: "category/:name",
    loadChildren: () => import('src/app/components/category/category.module').then((m) => m.CategoryModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
