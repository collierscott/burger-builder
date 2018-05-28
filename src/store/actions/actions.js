export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const addIngredient = (ingName) => {
    return {
        type: ADD_INGREDIENT,
        ingredientName: ingName
    }
};

export const removeIngredient = (ingName) => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName: ingName
    }
};