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

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(
                response => {
                    console.log(response.data);
                    dispatch(purchaseBurgerSuccess(response.data.objectId, orderData));
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

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/order.json')
            .then(response => {
                let results = response.data.results;
                const fetched = [];
                for(let key in results) {
                    let data = results[key];
                    fetched.push({
                        ...data,
                        id: data.objectId
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