import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {

    let login = <NavigationItem link="/login">Login</NavigationItem>;
    let order = null;

    if(props.isAuth) {
        login = <NavigationItem link="/logout">Logout</NavigationItem>;
        order = <NavigationItem link="/orders">Orders</NavigationItem>;
    }

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {order}
            {login}
        </ul>

    );
};

export default navigationItems;