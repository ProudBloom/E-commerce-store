import Axios from "axios"
import { CART_ADD_ITEM } from '../constants/cartConstants'

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