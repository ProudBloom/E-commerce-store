import Axios from "axios";
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SIGNOUT, USER_SIGNIN_SUCCESS } from "../constants/userConstants"

export const userSigninAction = (email, password) => async (dispatch) => {
    dispatch(
        {
            type: USER_SIGNIN_REQUEST, 
            payload: 
            {
                email: email,
                password: password,
            }
        });
    try {
        const { data } = await Axios.post('/api/users/signin', {email: email, password: password});
        dispatch(
            {
                type: USER_SIGNIN_SUCCESS, 
                payload: data,
            });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch(error) {
        dispatch(
            {
                type: USER_SIGNIN_FAIL,
                payload: (error.response && error.response.data) ? error.response.data.message : error.message
            });
    }
}

export const userRegisterAction = (name, email, password) => async (dispatch) => {
    dispatch(
        {
            type: USER_REGISTER_REQUEST,
            payload: 
            {
                name: name,
                email: email,
                password: password,
            }
        });
    try {
        const { data } = await Axios.post('/api/users/register', {name: name, email: email, password: password});
        dispatch(
            {
                type: USER_REGISTER_SUCCESS,
                payload: data,
            });
        //Log user in after signin
        dispatch(
            {
                type: USER_SIGNIN_SUCCESS, 
                payload: data,
            });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch(error) {
        dispatch(
            {
                type: USER_SIGNIN_FAIL,
                payload: (error.response && error.response.data) ? error.response.data.message : error.message
            });
    }
}

export const userSignoutAction = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({ type: USER_SIGNIN_SIGNOUT });
}