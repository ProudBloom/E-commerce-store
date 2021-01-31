import Axios from 'axios'
import { useSelector } from 'react-redux';
import { CART_EMPTY } from '../constants/cartConstants';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstants"

export const createOrderAction = (order) => async (dispatch, getState) => {
    dispatch(
        {
            type: ORDER_CREATE_REQUEST,
            payload: order,
        });

    try {
        const { signin: { userInfo } } = getState();
        const { data } = await Axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
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
}