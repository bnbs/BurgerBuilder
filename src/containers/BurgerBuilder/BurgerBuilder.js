import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import classes from './BurgerBuilder.css';
import SideDish from '../../components/Burger/SideDish/SideDish';

export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        isTabIngredientsActive: true
    }

    componentDidMount () {
        this.props.onInitIngredients();
        this.props.onInitSideDish();
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState( { purchasing: true } );
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    tabActiveHandler = (tabName) => {
        tabName === 'INGREDIENTS' ? this.setState({isTabIngredientsActive: true}) :  this.setState({isTabIngredientsActive: false});
    }

    render () {

        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.ings ) {

            let ingredientsTab = [classes.ButtonTab];
            let sidedishTab = [classes.ButtonTab];

            let activeTab = (
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                />
            );

            this.state.isTabIngredientsActive ? ingredientsTab = [classes.ButtonTab, classes.Active] : sidedishTab = [classes.ButtonTab, classes.Active];  
            if(!this.state.isTabIngredientsActive) {
                activeTab = <SideDish 
                                sideDishAdded={this.props.onSideDishAdded}
                                sideDishRemoved={this.props.onSideDishRemoved}
                                sideDish={this.props.sideDish}
                            />;
            }
            
            burger = (
                <div className={classes.BurgerBuilder}>
                    <Burger ingredients={this.props.ings} />
                    <div className={classes.Container}>
                        <p className={classes.Price} >Current Price: <strong>${this.props.price.toFixed(2)}</strong></p>
                        <div className={classes.Buttons}>
                            <button className={ingredientsTab.join(' ')} onClick={() => this.tabActiveHandler('INGREDIENTS')}>Burger Ingredients</button>
                            <button className={sidedishTab.join(' ')} onClick={() => this.tabActiveHandler('SIDE_DISH')}>Side Dish</button>
                        </div>
                        <div className={classes.ActiveTab}>
                            {activeTab}      
                        </div>                                          
                        <button 
                            className={classes.OrderButton} 
                            disabled={!this.updatePurchaseState(this.props.ings)}
                            onClick={this.purchaseHandler}> {this.props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'} </button>
                    </div>                    
                </div>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                sideDish={this.props.sideDish} />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
        sideDish: state.burgerBuilder.sideDish
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onInitSideDish: () => dispatch(actions.initSideDish()),
        onSideDishAdded: (sdName) => dispatch(actions.addSideDish(sdName)),
        onSideDishRemoved: (sdName) => dispatch(actions.removeSideDish(sdName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));