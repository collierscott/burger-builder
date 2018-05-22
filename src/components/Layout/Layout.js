import React from 'react';
import AuxWrapper from '../../hoc/AuxWrapper';
import classes from './Layout.css';

const layout = (props) => (
    <AuxWrapper>
        <div>Toolbar, sideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </AuxWrapper>
);

export default layout;