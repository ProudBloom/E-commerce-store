import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM: 
            const item = action.payload;
            //Compare id of a product in store vs item in action's payload (fetched from api)
            const existingItem = state.cartItems.find(x => x.product === item.product);
            if(existingItem) {
                return {
                    ...state,
                    //If there is old cart item saved in store, replace it
                    cartItems: state.cartItems.map(x => x.product === existingItem.product ? item : x)
                }
            }
            else {
               return { ...state, cartItems: [...state.cartItems, item] }; //concatinates items already in cart with new one
            }
        default:
            return state;
    }
}