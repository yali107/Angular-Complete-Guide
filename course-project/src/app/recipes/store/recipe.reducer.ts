import { Recipe } from '../recipe.model';

import * as RecipesAuctions from './recipe.actions';

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
};

export function recipeReducer(state = initialState, action: RecipesAuctions.RecipeActions) {
    switch (action.type) {
        case RecipesAuctions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        default:
            return state;
    }
}