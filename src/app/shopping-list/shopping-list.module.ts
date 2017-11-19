import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

const shoppingListRoutes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  declarations: [
    ShoppingEditComponent,
    ShoppingListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(shoppingListRoutes)
  ]
})
export class ShoppingListModule { }