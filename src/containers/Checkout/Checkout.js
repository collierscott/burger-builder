import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuesHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled = {this.checkoutCancelledHandler}
                    checkoutContinued = {this.checkoutContinuesHandler}
                />
                <Route path={this.props.match.url + '/contact-data'} 
                    component={ ContactData }
                    />
            </div>
        );
    }
}

const mapStateToProps = state => {
    // NOTE: The name properties for states have to match what is in reducer.js
    return {
        ings: state.ingredients
    }
};
//NOTE: mapStateToProps has to be first always. If none, then null
export default connect(mapStateToProps)(Checkout);