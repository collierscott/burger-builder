import React from 'react';
import AuxWrapper from '../../hoc/AuxWrapper';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

const layout = (props) => (
    <AuxWrapper>
        <Toolbar/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </AuxWrapper>
);

export default layout;