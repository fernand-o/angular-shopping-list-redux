import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit() {
    let id: number;
    if (this.editMode) {
      id = this.id;
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      id = this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['/recipes', id]);
  }

  createIngredientGroup(name: string, amount: number): FormGroup {
    return new FormGroup({
      'name': new FormControl(name, Validators.required),
      'amount': new FormControl(amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    });
  }

  onAddIngredient() {
    const ar = (<FormArray>this.recipeForm.get('ingredients'));
    ar.push(
      this.createIngredientGroup(null, null)
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let recipe = new Recipe(0, '', '', '', []);
    let ingredients = new FormArray([]);

    if (this.editMode) {
      recipe = (<Recipe>this.recipeService.getRecipe(this.id));
      for (let ingredient of recipe.ingredients)
        ingredients.push(
          this.createIngredientGroup(ingredient.name, ingredient.amount)
        );
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'ingredients': ingredients
    });

  }

}
