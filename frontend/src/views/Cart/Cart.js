import React from 'react'
import { useParams } from 'react-router-dom';
import './Cart.scss'

export default function Cart(props) {
    let { id } = useParams();
    const productId = id;
    const quantity = props.location.search? Number(props.location.search.split('=')[1]) : 1;
    return (
        <div>
            <h1>Cart</h1>
            <p>Product ID : {productId}</p>
            <p>Quantity : {quantity}</p>
        </div>
    )
}
