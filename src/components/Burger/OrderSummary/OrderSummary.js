import React from 'react';
import AuxWrapper from '../../../hoc/AuxWrapper';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
            )
        });
    return (
      <AuxWrapper>
          <h3>Your Order</h3>
          <p>Your burger with the following ingredients:</p>
          <ul>
              {ingredientSummary}
          </ul>
          <p>Continue to checkout?</p>
      </AuxWrapper>
    )
};

export default orderSummary;