import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants.js";

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