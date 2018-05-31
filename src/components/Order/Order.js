import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for(let name in props.ingredients) {
        ingredients.push(
            {
                name: name,
                amount: props.ingredients[name]
            }
        );
    }

    const output = ingredients.map(ig => {
        return <span key={ig.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
        >{ig.name} ({ig.amount})</span>;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {output}</p>
            <p>Price:  <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;