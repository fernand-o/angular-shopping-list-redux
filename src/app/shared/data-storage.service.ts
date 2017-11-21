import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private auth: AuthService) { }

  storeRecipes() {
    const token = this.auth.getToken();
    return this.http.put('https://ng-recipe-book-951ea.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.auth.getToken();
    let url = 'https://ng-recipe-book-951ea.firebaseio.com/recipes.json?auth=' + token;
    this.http.get<Recipe[]>(url)
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