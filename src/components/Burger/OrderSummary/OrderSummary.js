import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './OrderSummary.css';
import { SIDE_DISH_LABELS }  from '../SideDish/SideDish';


const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>);
        });

    const sideDishSummary = Object.keys(props.sideDish)
        .filter((sdKey) => {
            return props.sideDish[sdKey] === true;
        })
        .map(sdKey => {
            return (
                <li key={sdKey}>
                    <span style={{textTransform: 'capitalize'}}>{SIDE_DISH_LABELS[sdKey]}</span>
                </li>
            );
        });
    
    return (
        <Aux>
            <h2 className={classes.Title}>Your Order</h2>
            <div className={classes.OrderSummary}>
                <p>A delicious burger with the following ingredients and side dish</p>
                <ul>
                    {ingredientSummary}
                    {sideDishSummary}
                </ul>
                <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>           
            </div>   
            <div className={classes.Buttons}>
                <button className={classes.Danger} onClick={props.purchaseCancelled}>CANCEL</button>
                <button className={classes.Success} onClick={props.purchaseContinued}>CONTINUE</button>
            </div>              
        </Aux>
    )
};

export default orderSummary;