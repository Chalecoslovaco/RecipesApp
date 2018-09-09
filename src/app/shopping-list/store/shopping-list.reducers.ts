import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from "../../shared/ingredient.model";

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientId: number
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Bananas', 15)
    ],
    editedIngredient: null,
    editedIngredientId: null
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {...state, ingredients: [...state.ingredients, action.payload]};
        case ShoppingListActions.ADD_INGREDIENTS:
            return {...state, ingredients: [...state.ingredients, ...action.payload]}
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientId];
            const updatedIngredient = {...ingredient, ...action.payload.ingredient};
            const ingredients = [...state.ingredients];
            ingredients[state.editedIngredientId] = updatedIngredient;
            return {...state, ingredients: ingredients, editedIngredient: null, editedIngredientId: null};
        case ShoppingListActions.DELETE_INGREDIENT:
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(state.editedIngredientId, 1)
            return {...state, ingredients: oldIngredients, editedIngredient: null, editedIngredientId: null};
        case ShoppingListActions.START_EDIT:
            const editedIngredient = {...state.ingredients[action.payload]};
            return {...state, editedIngredient: editedIngredient, editedIngredientId: action.payload};
        case ShoppingListActions.START_EDIT:
            return {...state, editedIngredient: null, editedIngredientId: null};
        default: return state;
    }
}