import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import classes from './Checkout.css';

class Checkout extends Component {

    render () {

        let summary = <Redirect to="/" />
        if(this.props.ings){

            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div className={classes.Checkout}>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                    />
                    <ContactData />
                </div>                
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);