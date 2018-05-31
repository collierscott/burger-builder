import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

// This is the place to add middleware if it is needed. i.e. logger
// To enable this, uncomment and add to applyMiddleware below
// const logger = store => {
//     return next => {
//         return action => {
//             console.log('[Middleware] Dispatching', action);
//             // Lets things continue
//             const result = next(action);
//             console.log('[Middleware] next state', store.getState());
//             return result;
//         }
//     }
// };

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk))
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
