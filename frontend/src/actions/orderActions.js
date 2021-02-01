import Axios from 'axios'
import { CART_EMPTY } from '../constants/cartConstants';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL } from "../constants/orderConstants"

export const createOrderAction = (order) => async (dispatch, getState) => {
    dispatch(
        {
            type: ORDER_CREATE_REQUEST,
            payload: order,
        });

    try {
        const { signin: { userInfo } } = getState();
        const { data } = await Axios.post('/api/orders', order, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data.order,
            });
        dispatch(
            {
                type: CART_EMPTY,
            });
        localStorage.removeItem('cartItems');
    }
    catch(error) {
        dispatch(
            {
                type: ORDER_CREATE_FAIL,
                payload: (error.response && error.response.data) ? error.response.data.message : error.message,
            });
    }
};

export const orderDetailsAction = (orderId) => async (dispatch, getState) => {
    dispatch(
        {
            type: ORDER_DETAILS_REQUEST,
            payload: orderId,
        });
        try {
            const { signin: { userInfo } } = getState();
            const { data } = await Axios.get(`/api/orders/${orderId}`, { 
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });

            dispatch(
                {
                    type: ORDER_DETAILS_SUCCESS,
                    payload: data,
                });
        }
        catch(error) {
            dispatch(
                {
                    type: ORDER_DETAILS_FAIL,
                    payload: (error.response && error.response.data) ? error.response.data.message : error.message,
                });
        }
}