import {
  Component, OnInit, OnDestroy,
  //  Input, Output, EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeSelected2 = new EventEmitter<Recipe>();
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    // this.subscription = this.recipeService.recipesChanged.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // )
    
    this.subscription = this.store
      .select('recipes')
      .pipe(
        map(recipesState => {
          return recipesState.recipes;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
    // this.recipes = this.recipeService.getRecipes();
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeSelected2.emit(recipe);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
