import axios from '../../axios-orders';
import * as actionTypes from "./actionTypes";

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
  return dispatch => {
      axios.get('/Ingredient')
          .then(response => {
              // Convert the array of ingredients and amounts to an object
              let ingredientsResult =  Object.assign(...response.data.results
                  .map(d => ({[d.name]: d.amount}))
              );
              dispatch(setIngredients(ingredientsResult));
          })
          .catch(error => {
              dispatch(fetchIngredientsFailed());
          });
  }
};