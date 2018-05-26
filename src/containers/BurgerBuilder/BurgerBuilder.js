import React, { Component } from 'react';
import axios from '../../axios-orders';
import AuxWrapper from '../../hoc/AuxWrapper/AuxWrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    componentDidMount () {
        axios.get('/Ingredient')
            .then(response => {
                // Convert the array of ingredients and amounts to an object
                let ingregientsResult =  Object.assign(...response.data.results
                    .map(d => ({[d.name]: d.amount})));
                this.setState({ingredients: ingregientsResult});
            });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igkey => {
               return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
            ;

        this.setState({purchasable: sum > 0});
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            //Make sure to recalculate on the server
            price: this.state.totalPrice,
            customer: {
                name: 'Scott Collier',
                address: {
                    street: '123 Avenue',
                    zipCode: '12345',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };

        // Save order
        axios.post('/Order', order)
            .then(
                response => {
                    console.log(response);
                    this.setState({loading: false, purchasing: false});
                }
            )
            .catch(
                error => {
                    console.log(error);
                    this.setState({loading: false, purchasing: false});
                }
            );
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0) return;

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        if(this.state.loading) {
            orderSummary = <Spinner/>;
        }

        let burger = <Spinner/>;

        if(this.state.ingredients) {
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchasedCancelled={this.purchaseCancelHandler}
                purchasedContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
            />;

            burger = (
                <AuxWrapper>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </AuxWrapper>
            );
        }

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

export default withErrorHandler(BurgerBuilder, axios);