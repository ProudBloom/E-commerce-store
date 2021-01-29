import React from 'react'
import { useSelector } from 'react-redux'
import CheckoutProgress from '../../components/CheckoutProgress/CheckoutProgress'
import { SHIPPING_PRICE, FREE_SHIPPING_PRICE } from '../../variables'
import './Summary.scss'

export default function Summary(props) {

    const cart = useSelector(state => state.cart);
    const { cartItems, shippingAddress, paymentMethod } = cart;
    const signin = useSelector(state => state.signin);
    const { userInfo } = signin;

    const toPrice = (number) =>  Number(number.toFixed(2));

    cart.itemsPrice = toPrice(cart.cartItems.reduce( (accumulator, current) => accumulator + current.quantity * current.price, 0));
    cart.shippingPrice = cart.itemsPrice > FREE_SHIPPING_PRICE ? toPrice(0) : toPrice (SHIPPING_PRICE);
    cart.taxPrice = toPrice(.23 * cart.itemsPrice);
    cart.totalPrice = toPrice(cart.itemsPrice + cart.shippingPrice + cart.taxPrice);

    const paymentSwitch = (payment) => {
        switch(payment) {
            case 'PayPal':
                return (<i className="fa fa-paypal"></i>);
            case 'CreditCard': 
                return (<i className="fa fa-credit-card"></i>);
            default:
                return;
        }
    }

    const placeOrderHandler = () => {

    }


    if(!userInfo) {
        props.history.push('/signin');
    }

    else if(!cart.paymentMethod) {
        props.history.push('/payment');
    }

    return (
        <div>
            <CheckoutProgress step1 step2 step3 step4/>
            <div className="summary__wrapper">
                <div className="summary">
                    <div className="summary__ceridentials">
                        <h1>ceridentials</h1>
                        <div className="ceridentials-data">
                            <p><b>Name: </b>{shippingAddress.fullname}</p>
                            <p><b>Address: </b>{shippingAddress.address}</p>
                            <p><b>City: </b>{shippingAddress.city}</p>
                            <p><b>ZIP code: </b>{shippingAddress.zip}</p>
                            <p><b>Country: </b>{shippingAddress.country}</p>
                        </div>
                    </div>
                    <div className="summary__payment">
                        <h1>payment</h1>
                        <div className="payment-icon">{paymentSwitch(paymentMethod)}</div>
                    </div>
                    <div className="summary__items">
                        <h1>items</h1>
                        {
                            cartItems.map((item, index) => (
                            <ul>
                                <li><img src={item.image} alt={item.name}/></li>
                                <li><b>{item.name}</b></li>
                                <li><p>{item.price}zł</p></li>
                                <li><p>Size: {Math.floor(Math.random() * (47 - 38)) + 38}</p></li>
                                <li><p>Qty: {item.quantity}</p></li>
                                <li><p>Subtotal: {Math.round((item.price * item.quantity + Number.EPSILON) * 100) / 100}zł</p></li>
                            </ul>
                        ))
                        }
                    </div>
                    <div className="summary__summ">
                        <h1>summary</h1>
                        <div className="summ-data">
                            <p><b>All items cost: </b>{cart.itemsPrice} zł</p>
                            <p><b>Shipping cost: </b>{cart.shippingPrice} zł</p>
                            <p><b>Tax: </b>{cart.taxPrice} zł</p>
                            <p id="summ-total"><b>Total cost: </b>{cart.totalPrice} zł</p>
                        </div>
                        <div className="summ-button">
                            <button onClick={placeOrderHandler}><span>Checkout</span><i className="fa fa-credit-card"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
