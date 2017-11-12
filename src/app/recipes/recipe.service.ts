import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Panquecas', 'Receita de massa', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqo7DNxJn0mKn5hs0Kao4vMNSjYFD470AqpbI8m8x_iBF8PHsZw'),
    new Recipe('Pasta', 'Receita de massa', 'http://culinaria.culturamix.com/blog/wp-content/gallery/receitas-de-massa-de-panqueca-1-1/Receitas-de-Massa-de-Panqueca-2.jpg')
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}