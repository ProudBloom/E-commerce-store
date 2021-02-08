import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, 
         ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_HISTORY_FAIL, ORDER_HISTORY_REQUEST, ORDER_HISTORY_SUCCESS, 
         ORDER_PAYMENT_FAIL, ORDER_PAYMENT_REQUEST, ORDER_PAYMENT_RESET, ORDER_PAYMENT_SUCCESS } from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order:action.payload };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
}

export const orderDetailsReducer = (state = { loading: true }, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, success: true, order:action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const orderPaymentReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_PAYMENT_REQUEST:
            return { loading: true };
        case ORDER_PAYMENT_SUCCESS:
            return { loading: false, success: true };
        case ORDER_PAYMENT_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_PAYMENT_RESET:
            return {};
        default:
            return state;
    }
}

export const orderHistoryReducer = (state = { orders: [] }, action) => {
    switch(action.type) {
        case ORDER_HISTORY_REQUEST:
            return { loading: true };
        case ORDER_HISTORY_SUCCESS:
            return { loading: false, orders: action.payload };
        case ORDER_HISTORY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}