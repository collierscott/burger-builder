import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    // Before rendering children
    componentWillMount() {
        // Decode
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        // Build object
        for(let param of query.entries()) {
            // ['salad', 1]
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }  
        }

        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuesHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled = {this.checkoutCancelledHandler}
                    checkoutContinued = {this.checkoutContinuesHandler}
                />
                <Route path={this.props.match.url + '/contact-data'} 
                    render={(props) => (<ContactData 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice.toString()} 
                        {...props}/>)}
                    />
            </div>
        );
    }
}

export default Checkout;