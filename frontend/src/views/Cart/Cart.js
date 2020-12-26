import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addToCartAction } from '../../actions/cartActions'
import './Cart.scss'

export default function Cart(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    
    useEffect(()=> {
        dispatch(addToCartAction(productId, quantity));
    }, [dispatch, productId, quantity]);
    
    return (
        <div>
            <h1>Cart</h1>
            <p>Product ID : {productId}</p>
            <p>Quantity : {quantity}</p>
        </div>
    )
}
