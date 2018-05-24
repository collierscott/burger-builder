import React from 'react';
import Button from '../../UI/Button/Button';
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
          <p>Total price is {props.price.toFixed(2)}</p>
          <p>Continue to checkout?</p>
          <Button btnType="Danger" clicked={props.purchasedCancelled}>Cancel</Button>
          <Button btnType="Success" clicked={props.purchasedContinued}>Success</Button>
      </AuxWrapper>
    )
};

export default orderSummary;