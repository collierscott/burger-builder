import React, {Component} from 'react';
import classes from './Modal.css';
import AuxWrapper from '../../../hoc/AuxWrapper';
import Backdrop from '../Backdrop/Backdrop';

class Modal  extends Component {
    // The wrapping class controls update of children.
    // Converted to a class to control when it is updated.
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <AuxWrapper>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </AuxWrapper>
        )
    }
}

export default Modal;