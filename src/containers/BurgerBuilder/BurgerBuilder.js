import React, { Component } from 'react';
import AuxWrapper from '../../hoc/AuxWrapper';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }
    };

    render () {
        return (
            <AuxWrapper>
                <Burger ingredients={this.state.ingredients}/>
                <div>Builder Controls</div>
            </AuxWrapper>
        );
    }
}

export default BurgerBuilder;