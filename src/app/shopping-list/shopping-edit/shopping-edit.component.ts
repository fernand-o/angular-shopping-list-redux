import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/Store';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import * as fromShoppingList from '../store/shopping-list.reducers';
import * as ShopActions from '../store/shopping-list.actions';
import { StopEdit } from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      data => {
        this.editMode = data.editedIngredientIndex > -1;
        if (this.editMode) {
          this.editedItem = data.editedIngredient;
          this.slForm.setValue(this.editedItem);
        }
      }
    )
  }

  ngOnDestroy() {
    this.store.dispatch(new StopEdit());
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShopActions.UpdateIngredient({ ingredient: newIngredient }));
    } else {
      this.store.dispatch(new ShopActions.AddIngredients([newIngredient]));
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShopActions.DeleteIngredient());
    this.onClear();
  }
}
