import Axios from 'axios';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_STOCK_UPDATE_REQUEST, PRODUCT_STOCK_UPDATE_SUCCESS, PRODUCT_STOCK_UPDATE_FAIL } from '../constants/productConstants'

export const listProductsAction = () => async (dispatch) => {
    dispatch(
        {
            type: PRODUCT_LIST_REQUEST 
        });
    try {
        const { data } = await Axios.get('/api/products');
        dispatch(
            {
                type: PRODUCT_LIST_SUCCESS, 
                payload: data 
            });
    }
    catch(error) {
        dispatch(
            {
                type: PRODUCT_LIST_FAIL, 
                payload: error.message 
            });
    }
}

export const detailsProductAction = (productId) => async (dispatch) => {
    dispatch(
        {
            type: PRODUCT_DETAILS_REQUEST, 
            payload: productId 
        });
    try {
        const { data } = await Axios.get(`/api/products/${productId}`);
        dispatch(
            {
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data
            });
    }
    catch(error) {
        dispatch(
            { 
                type: PRODUCT_DETAILS_FAIL, 
                payload: (error.response && error.response.data) ? error.response.data.message : error.message
            });
    }
}

export const productUpdateStockAction = (orderedItem) => async (dispatch) => {
    dispatch(
        {
            type: PRODUCT_STOCK_UPDATE_REQUEST,
            payload: orderedItem
        });
        try {
            const { data } = await Axios.put(`/api/products/${orderedItem.product}/buy`, {quantity: orderedItem.quantity});

            dispatch(
                {
                    type: PRODUCT_STOCK_UPDATE_SUCCESS,
                    payload: data,
                });
        }
        catch(error) {
            dispatch(
                {
                    type: PRODUCT_STOCK_UPDATE_FAIL,
                    payload: (error.response && error.response.data) ? error.response.data.message : error.message,
                });
        }
}