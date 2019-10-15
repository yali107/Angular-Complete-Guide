import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A test recipe',
  //     'This is simply a test',
  //     'https://assets.marthastewart.com/styles/wmax-750/d39/crepes-recipe-0419-9085-lw-076-0746463d/' +
  //     'crepes-recipe-0419-9085-lw-076-0746463d_horiz.jpg?itok=hz2JsqRE',
  //     [new Ingredient('Bread', 2), new Ingredient('Cheese', 3)]
  //   ),
  //   new Recipe(
  //     'A test recipe 2',
  //     'This is simply a test 2',
  //     'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_9960_720.jpg',
  //     [new Ingredient('Egg', 3), new Ingredient('Apple', 5), new Ingredient('Banana', 2)]
  //   ),
  // ];
  private recipes: Recipe[] = [];
  
  constructor(
    // private slService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) { }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }
  
}
