import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

export const addToCartAction = (productId, quantity) => async (dispatch, getState) => {
    const {data} = await Axios.get(`/api/products/${productId}`);
    dispatch(
        {
            type: CART_ADD_ITEM, 
            payload: {
                name: data.name,
                image: data.image,
                price: data.price,
                inStock: data.inStock,
                product: data._id,  //product = id
                quantity: quantity,
            }
        });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCartAction = (producId) => (dispatch, getState) => {
    dispatch(
        {
            type: CART_REMOVE_ITEM,
            payload: producId,
        });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddressAction = (addressData) => async (dispatch, getstate) => {
    dispatch(
        {
            type: CART_SAVE_SHIPPING_ADDRESS,
            payload: addressData
        });
    localStorage.setItem('shippingAddress', JSON.stringify(addressData));
}