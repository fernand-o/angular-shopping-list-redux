import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/Store';
import { Recipe } from '../recipe.model';

import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { AddIngredients } from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.recipe = this.recipeService.getRecipe(+params['id']);
      }
    )
  }

  toShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new AddIngredients(ingredients));
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['/recipes']);
  }

}
