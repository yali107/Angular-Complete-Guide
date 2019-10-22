import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  storeSub: Subscription;

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.id, newRecipe: this.recipeForm.value}));
    } else {
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store.select('recipes')
        .pipe(
          map(recipesState => {
            return recipesState.recipes.find((recipe, index) => {
              return index === this.id;
            })
          })
        )
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (let ingredients of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredients.name, Validators.required),
                  'amount': new FormControl(ingredients.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                })
              )
            }
          }
        })
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }
}
