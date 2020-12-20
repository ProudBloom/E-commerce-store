import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productDetailsReducer, productListReducer } from "./reducers/productsReducres";

const initialState = {};

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
})

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer, 
    initialState, 
    composeEnchancer(applyMiddleware(thunk))
);

export default store;
