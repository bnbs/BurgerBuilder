import React from 'react';

import Checkbox from '../../UI/Checkbox/Checkbox';
import classes from './SideDish.css';

export const SIDE_DISH_LABELS = {
    frenchFries: 'French Fries',
    onionRings: 'Onion Rings',
    barbecueSauce: 'Barbecue Sauce',
    mayonnaise: 'Mayonnaise',
    soda: 'Soda',
    juice: 'Juice'
}

const sideDish = (props) => (
    <div className={classes.SideDishContainer}>
        {Object.keys(SIDE_DISH_LABELS).map(cb => {
            return <Checkbox
                        key={cb}
                        label={SIDE_DISH_LABELS[cb]} 
                        added={() => props.sideDishAdded(cb)}
                        removed={() => props.sideDishRemoved(cb)}
                        value={props.sideDish[cb]}
                    />
        })} 
    </div>
);

export default sideDish;