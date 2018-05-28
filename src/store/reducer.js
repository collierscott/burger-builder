import * as actionTypes from './actions/index';
import { updateObject} from "./utility";

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

// Cannot execute async code in here. Not even with promises. Net to use action creators
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            return updateObject(state, {
                ingredients: updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}),
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            });
        case actionTypes.REMOVE_INGREDIENT:
            return updateObject(state, {
                ingredients: updateObject(state.ingredients, {
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }),
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            });
        default:
            return state;
    }
};

export default reducer;