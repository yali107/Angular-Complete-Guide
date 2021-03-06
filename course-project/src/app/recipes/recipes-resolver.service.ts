import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';

// import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
// import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    // private dataStorageService: DataStorageService,
    // private recipeService: RecipeService,
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const recipes = this.recipeService.getRecipes();

    // if (recipes.length === 0) {
    //   return this.dataStorageService.fetchRecipes();  
    // } else {
    //    return recipes;
    // }
    return this.store.select('recipes').pipe(
      take(1),
      map(recipesStates => {
        return recipesStates.recipes;
      }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeActions.FetchRecipes());
          return this.actions$.pipe(
            ofType(RecipeActions.SET_RECIPES),
            take(1));
        } else {
          return of(recipes);
        }
      })
    )

  }
}
