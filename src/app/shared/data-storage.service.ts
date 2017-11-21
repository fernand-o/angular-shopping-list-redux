import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import 'rxjs/Rx';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  readonly recipesEndpoint = 'https://ng-recipe-book-951ea.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put(this.recipesEndpoint, this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get<Recipe[]>(this.recipesEndpoint)
      .map((recipes) => {
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe(
      (recipes) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}