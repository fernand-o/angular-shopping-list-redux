import { Component, Input } from '@angular/core';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: { name: string, description: string, imagePath: string };

  constructor(private recipeService: RecipeService) { }

  RecipeSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}