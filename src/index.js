import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import App from './App';
import reducer from './store/reducer';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// This is the place to add middleware if it is needed. i.e. logger
const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            // Lets things continue
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(logger))
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
