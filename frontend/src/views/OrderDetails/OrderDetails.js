import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutProgress from '../../components/CheckoutProgress/CheckoutProgress'
import { orderDetailsAction } from '../../actions/orderActions'
import './OrderDetails.scss'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import ErrorMessageBox from '../../components/ErrorMessageBox/ErrorMessageBox'

export default function OrderDetails(props) {

    const dispatch = useDispatch();

    const signin = useSelector(state => state.signin);
    const { userInfo } = signin;
    const orderId = props.match.params.id;
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

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

    if(!userInfo) {
        props.history.push('/signin');
    }

    useEffect(() => {
        dispatch(orderDetailsAction(orderId));
    }, [dispatch, orderId]);

    return loading ? (<LoadingBox />) : 
            error ? (<ErrorMessageBox>{error}</ErrorMessageBox>) :
        (
        <div>
            <h1>Order no. {order._id}</h1>
            <div className="summary__wrapper">
                <div className="summary">
                    <div className="summary__ceridentials">
                        <h1>ceridentials</h1>
                        <div className="ceridentials-data">
                            <p><b>Name: </b>{order.shippingAddress.fullname}</p>
                            <p><b>Address: </b>{order.shippingAddress.address}</p>
                            <p><b>City: </b>{order.shippingAddress.city}</p>
                            <p><b>ZIP code: </b>{order.shippingAddress.zip}</p>
                            <p><b>Country: </b>{order.shippingAddress.country}</p>
                        </div>
                        {order.isDelivered ? (<p>Delivered at {order.deliveredAt}</p>) : (<p>Not delivered</p>)}
                    </div>
                    <div className="summary__payment">
                        <h1>payment</h1>
                        <div className="payment-icon">{paymentSwitch(order.paymentMethod)}</div>
                        {order.isPaid ? (<p>Paid at {order.paidAt}</p>) : (<p>Not paid</p>)}
                    </div>
                    <div className="summary__items">
                        <h1>items</h1>
                        {
                            order.orderItems.map((item, index) => (
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
                            <p><b>All items cost: </b><span>{order.itemsPrice.toFixed(2)} zł</span></p>
                            <p><b>Shipping cost: </b><span>{order.shippingPrice.toFixed(2)} zł</span></p>
                            <p><b>Tax: </b><span>{order.taxPrice.toFixed(2)} zł</span></p>
                            <p id="summ-total"><b>Total cost: </b><span>{order.totalPrice.toFixed(2)} zł</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
