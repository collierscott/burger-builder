import {put} from 'redux-saga/effects';
import axios from "../../axios-orders";
import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());

    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.id, action.orderData))
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put (actions.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';

    try {
        const response = yield axios.get('/orders.json' + queryParams);
        let results = response.data;
        const fetched = [];
        for(let key in results) {
            let data = results[key];
            fetched.push({
                ...data,
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetched));
    } catch(error) {
        put(actions.fetchOrdersFail(error));
    }
}