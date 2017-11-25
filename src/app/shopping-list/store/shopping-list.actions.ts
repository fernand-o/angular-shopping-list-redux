import { Action } from '@ngrx/Store';

import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) { }
}

export type ShoppingListActions = AddIngredients;