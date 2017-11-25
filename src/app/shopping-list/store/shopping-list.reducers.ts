import { Ingredient } from '../../shared/ingredient.model';
import * as Shop from './shopping-list.actions';;

export class ShoppingListType {
  shoppingList: {
    ingredients: Ingredient[]
  }
}

const initialState = {
  ingredients: [
    new Ingredient('bacon', 5),
    new Ingredient('salsa', 2)
  ]
}

export function shoppingListReducer(state = initialState, action: Shop.ShoppingListActions) {
  switch (action.type) {
    case Shop.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    default:
      return state;
  }
}