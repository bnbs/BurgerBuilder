import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-8f07f.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    }
}

export const initSideDish = () => {
    return {
        type: actionTypes.INIT_SIDE_DISH
    }
}

export const addSideDish = (name) => {
    return {
        type: actionTypes.ADD_SIDE_DISH,
        sideDishName: name
    };
}

export const removeSideDish = (name) => {
    return {
        type: actionTypes.REMOVE_SIDE_DISH,
        sideDishName: name
    };
}