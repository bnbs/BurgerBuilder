import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
    sideDish: {
        frenchFries: false,
        onionRings: false,
        barbecueSauce: false,
        mayonnaise: false,
        soda: false,
        juice: false
    }
};

const INGREDIENT_PRICES = {
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7,
    salad: 0.5
};

const SIDE_DISH = {
    frenchFries: 7.50,
    onionRings: 10.50,
    barbecueSauce: 2.50,
    mayonnaise: 2.50,
    soda: 3.50,
    juice: 5.50
}  

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedSt);
}

const setIngredient = (state, action) => {
    return updateObject( state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    } );
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
}

const initSideDish = (state, action) => {
    return updateObject(state, {
        sideDish: {
            frenchFries: false,
            onionRings: false,
            barbecueSauce: false,
            mayonnaise: false,
            soda: false,
            juice: false
        }
    });
}

const addSideDish = (state, action) => {
    const updatedSideDishValue = { [action.sideDishName]: true };
    const updatedSideDish = updateObject(state.sideDish, updatedSideDishValue);
    const updatedState = {
        sideDish: updatedSideDish,
        totalPrice: state.totalPrice + SIDE_DISH[action.sideDishName],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeSideDish = (state, action) => {
    const updatedSideDishValue = { [action.sideDishName]: false };
    const updatedSideDish = updateObject(state.sideDish, updatedSideDishValue);
    const updatedState = {
        sideDish: updatedSideDish,
        totalPrice: state.totalPrice - SIDE_DISH[action.sideDishName],
        building: true
    }
    return updateObject(state, updatedState);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);
        case actionTypes.INIT_SIDE_DISH:
            return initSideDish(state, action);
        case actionTypes.ADD_SIDE_DISH:
            return addSideDish(state, action);
        case actionTypes.REMOVE_SIDE_DISH:
            return removeSideDish(state, action);
        default:
            return state;
    }
};

export default reducer;