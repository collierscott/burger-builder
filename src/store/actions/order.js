import axios from '../../axios-orders';
import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(
                response => {
                    console.log(response.data);
                    dispatch(purchaseBurgerSuccess(response.data.id, orderData));
                }
            )
            .catch(
                error => {
                    dispatch(purchaseBurgerFail(error));
                }
            );
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }

};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token)
            .then(response => {
                let results = response.data;
                const fetched = [];
                for(let key in results) {
                    let data = results[key];
                    fetched.push({
                        ...data,
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetched));
                //console.log(this.state.orders);
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    }
};