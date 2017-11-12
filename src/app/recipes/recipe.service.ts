import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(1, 'Panquecas', 'Ótimas para o café da manhã', 'http://culinaria.culturamix.com/blog/wp-content/gallery/receitas-de-massa-de-panqueca-1-1/Receitas-de-Massa-de-Panqueca-2.jpg',
      [
        new Ingredient('Ovos', 2),
        new Ingredient('Farinha', 1),
        new Ingredient('Agua', 5)
      ]),
    new Recipe(2, 'Hamburguer', 'O melhor hambúrguer do Brasil', 'https://static.vix.com/pt/sites/default/files/styles/large/public/bdm/receita/receita-de-carne-de-hamburguer.jpg',
      [
        new Ingredient('Pão', 1),
        new Ingredient('Meat', 3),
        new Ingredient('Tomato', 10)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.find(
      (value: Recipe) => {
        if (value.id === id)
          return true;
      }
    )
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}