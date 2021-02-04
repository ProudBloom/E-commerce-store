import { PayPalButton } from 'react-paypal-button-v2'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderDetailsAction, orderPaymentAction } from '../../actions/orderActions'
import './OrderDetails.scss'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import ErrorMessageBox from '../../components/ErrorMessageBox/ErrorMessageBox'
import axios from 'axios'
import { ORDER_PAYMENT_RESET } from '../../constants/orderConstants'

export default function OrderDetails(props) {

    const dispatch = useDispatch();
    
    const urlOrderId = props.match.params.id;
    const signin = useSelector(state => state.signin);
    const { userInfo } = signin;
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderPayment = useSelector(state => state.orderPayment);
    const { error: paymentError, success: paymentSuccess } = orderPayment; //Rename error and success



    const [paypalSdkReady, setPaypalSdkReady] = useState('');

    if(!userInfo) {
        props.history.push('/signin');
    }

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

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;

            script.onload = () => {
                setPaypalSdkReady(true);
            };

            document.body.appendChild(script);
        };

        if(!order || paymentSuccess || (order && order._id !== urlOrderId)) {
            dispatch({ type: ORDER_PAYMENT_RESET })
            dispatch(orderDetailsAction(urlOrderId));
        }

        else {
            if(!order.isPaid) {
                if(!window.paypal) {
                    addPayPalScript();
                }
                else {
                    setPaypalSdkReady(true);
                }
            }
        }

    }, [dispatch, order, urlOrderId, setPaypalSdkReady, paymentSuccess]);

    
    const successPaymentHandler = (paymentResult) => {
        dispatch(orderPaymentAction(order, paymentResult));
    }

    return loading ? (<LoadingBox />) : 
            error ? (<ErrorMessageBox>{error}</ErrorMessageBox>) :
        (
        <div>
            <h1 className="summary__heading">Order no. {order._id}</h1>
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
                        <div className="delivery-status">
                            {
                            order.isDelivered 
                            ? (<div className="delivered">Delivered at {order.deliveredAt.substr(0, 10)}, {parseInt(order.deliveredAt.substr(11, 2)) + 1}{order.deliveredAt.substr(13, 3)}</div>)
                            : (<div className="not-delivered">Not delivered</div>)
                            }
                        </div>
                    </div>
                    <div className="summary__payment">
                        <h1>payment</h1>
                        <div className="payment-icon">{paymentSwitch(order.paymentMethod)}</div>
                        <div className="payment-status">
                            {
                            order.isPaid 
                            ? (<div className="paid">Paid at {order.paidAt.substr(0, 10)}, {parseInt(order.paidAt.substr(11, 2)) + 1}{order.paidAt.substr(13, 3)}</div>)
                            : (<div className="not-paid">Not paid</div>)
                            }
                            </div>
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
                        {
                            !order.isPaid  && (
                                <div className="summ-paypal">
                                    {
                                        !paypalSdkReady 
                                        ? (<LoadingBox></LoadingBox>)
                                        : <>
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                        </>
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                {paymentError && <div className="summary__payment-error"><p>{paymentError}</p></div>}
            </div>
        </div>
    )
}
