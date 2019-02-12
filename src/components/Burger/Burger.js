import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

import classes from "./Burger.css";

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  // Hack
  let attachedClasses = [classes.BurgerContainer];
  let sizeIngredients = props.ingredients.meat + props.ingredients.salad + props.ingredients.bacon / 2 + ((props.ingredients.cheese * 2) / 3);
  if (sizeIngredients >= 6) {
    attachedClasses.push(classes.BurgerContainerMax);
  }

  return (
    <div className={classes.BurgerWrapper}>
      <div className={classes.Burger}>
        <div className={attachedClasses.join(' ')}>
          <BurgerIngredient type="bread-top" />
          {transformedIngredients}
          <BurgerIngredient type="bread-bottom" />
        </div>
      </div>
    </div>
  );
};

export default burger;
