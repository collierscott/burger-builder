import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient } from '../../store/actions/actions';

import AuxWrapper from '../../hoc/AuxWrapper/AuxWrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/actions';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        // Local UI state
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount () {
        // axios.get('/Ingredient')
        //     .then(response => {
        //         // Convert the array of ingredients and amounts to an object
        //         let ingregientsResult =  Object.assign(...response.data.results
        //             .map(d => ({[d.name]: d.amount}))
        //         );
        //         this.setState({ingredients: ingregientsResult});
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igkey => {
               return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render () {
        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded.</p> : <Spinner/>;

        if(this.props.ings) {
            burger = (
                <AuxWrapper>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </AuxWrapper>
            );
        }

        let orderSummary = <OrderSummary
            ingredients={this.props.ings}
            purchasedCancelled={this.purchaseCancelHandler}
            purchasedContinued={this.purchaseContinueHandler}
            price={this.props.price}
        />;

        if(this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <AuxWrapper>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </AuxWrapper>
        );
    }
}

const mapStateToProps = state => {
  return {
      ings: state.ingredients,
      price: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName))
    }
};

// This works because withErrorHandler passes on this.props
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
