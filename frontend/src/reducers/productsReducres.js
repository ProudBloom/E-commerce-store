import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_STOCK_UPDATE_FAIL, PRODUCT_STOCK_UPDATE_REQUEST, PRODUCT_STOCK_UPDATE_SUCCESS } from "../constants/productConstants.js";

export const productListReducer = (state = { isLoading: true, products: [], error: null }, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return { isLoading: true };
        case PRODUCT_LIST_SUCCESS:
            return { isLoading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { isLoading: false, error: action.payload };
        default:
            return state;
    };
};

export const productDetailsReducer = (state = { isLoading: true, product: {}, error: null }, action) => {
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { isLoading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { isLoading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { isLoading: false, error: action.payload };
        default:
            return state;
    };
}

export const productUpdateStockReducer = (state = {}, action) => {
    switch(action.type) {
        case PRODUCT_STOCK_UPDATE_REQUEST:
            return { loading: true };
        case PRODUCT_STOCK_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_STOCK_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}