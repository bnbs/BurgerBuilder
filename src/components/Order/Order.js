import React from 'react';

import classes from './Order.css';
import { SIDE_DISH_LABELS }  from '../Burger/SideDish/SideDish';

const order = ( props ) => {
    const ingredients = [];
    const sideDish = [];

    for ( let ingredientName in props.ingredients ) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                padding: '5px'
                }}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    let sideDishSummary = null;
    if(props.sideDish) {

        for ( let i = 0; i < props.sideDish.length; i++ ){
            sideDish.push(props.sideDish[i]);
        }
    
        const sideDishOutput = sideDish.map(sd => {
            return <span
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    padding: '5px'
                    }}
                key={sd}>{SIDE_DISH_LABELS[sd]}</span>;
        });

        sideDishSummary = (<p><b>Side Dish:</b> {sideDishOutput}</p>);
    }    

    return (
        <div className={classes.Order}>
            <p><b>Ingredients:</b> {ingredientOutput}</p>
            {sideDishSummary}
            <div>
                <p>Price: <strong>USD {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p>
                <button className={classes.Button} onClick={props.orderDeleted}>Delete</button>
            </div>            
        </div>
    );
};

export default order;