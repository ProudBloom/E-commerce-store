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
            case 'Przelewy24': 
                return (<svg width="600" height="204" viewBox="0 0 600 204" fill="#E2B05A" xmlns="http://www.w3.org/2000/svg">
                <path d="M125.7 117.6L175.3 117.5L173.5 128.8L132 168.3H166.8L164.8 180.4H113.6L115.7 167.9L155.4 129.8H123.7L125.7 117.6Z"/>
                <path d="M71.6001 98.3C70.5001 97.2 69.0001 96.3 67.3001 95.6C65.5001 94.9 63.5001 94.4 61.5001 94C59.0001 93.6 56.6001 93.4 54.9001 93.3C53.3001 93.2 52.3001 93.2 52.3001 93.2H30.6001H14.5001L0.100098 180.4H13.6001L18.9001 148.1L45.1001 148.2C45.1001 148.2 55.3001 148.6 62.5001 144.8C69.7001 141 71.7001 132.3 71.7001 132.3C71.7001 132.3 72.5001 129.1 73.2001 125.1C73.9001 120.8 74.7001 115.6 75.0001 112.8C75.2001 111.6 75.3001 110.8 75.3001 110.8C75.3001 110.8 75.5001 109.9 75.5001 108.5C75.5001 106.6 75.2001 103.7 73.7001 100.9C73.0001 100 72.4001 99.1 71.6001 98.3ZM61.2001 113.7C61.2001 113.9 60.0001 120.9 58.4001 129.2C57.8001 132.4 55.4001 134.1 52.6001 134.7C48.0001 135.7 43.0001 135.5 43.0001 135.5L21.1001 135.4L25.9001 106.4L45.7001 106.5C45.7001 106.5 47.0001 106.5 48.9001 106.5C51.0001 106.5 53.8001 106.6 56.2001 106.9C58.2001 107.2 59.8001 107.6 60.3001 108.2C61.0001 109 61.2001 110.1 61.3001 111.1C61.4001 112.4 61.2001 113.6 61.2001 113.7Z"/>
                <path d="M242.4 93.2H255.4L240.9 180.4H227.9L242.4 93.2Z" />
                <path d="M311.7 117.6L324.2 117.5L328.6 161.8L347.7 117.5H363.1L367.6 162L386.7 117.5H399.7L372.2 180.4H356.9L352.5 136.4L333.1 180.4H318.1L311.7 117.6Z"/>
                <path d="M218.5 118.1C214.9 116.9 208.6 116.7 203.2 116.7C198 116.8 195.7 117 193.7 117.4C193.7 117.4 184.5 118.7 179.3 125.2C174.1 131.7 172.5 145.8 172.5 145.8C172.5 145.8 169.4 161.4 170.3 166.6C171.2 171.8 172.8 176.6 178.7 178.9C184.6 181.2 189.6 181.1 189.6 181.1C189.6 181.1 200.1 181.9 208 180.1C215.9 178.3 220.1 172.7 220.1 172.7C220.1 172.7 222 170.3 223.3 167.4C224.6 164.5 225 162.6 225.1 162.3L225.9 158.9H212.4C212.4 158.9 211.7 167.8 204.4 168.6C197.1 169.4 193.3 169.1 191.8 169C190.4 168.9 182.6 169.3 183.2 162.8C183.2 162.7 183.2 162.6 183.2 162.4C183.5 155 184.4 153.1 184.4 153.1L226.7 153L228.5 142.5C230.8 130.6 229.3 121.6 218.5 118.1ZM215.6 141H186.6L187.7 136.4C187.7 136.4 188.7 132.8 190.7 131.3C192.7 129.8 195.3 129.5 197.7 129.3C200.1 129.1 206.5 128.6 211.8 129.7C213.5 130 215.2 131 215.6 132.5C216.7 135.8 215.6 141 215.6 141Z"/>
                <path d="M183.5 162.5C183.5 162.6 183.5 162.7 183.5 162.8C183.4 163.3 183.5 162.5 183.5 162.5Z"/>
                <path d="M298.2 118.1C294.6 116.9 288.3 116.7 282.9 116.7C277.7 116.8 275.4 117 273.4 117.4C273.4 117.4 264.2 118.7 259 125.2C253.8 131.7 252.2 145.8 252.2 145.8C252.2 145.8 249.1 161.4 250 166.6C250.9 171.8 252.5 176.6 258.4 178.9C264.3 181.2 269.3 181.1 269.3 181.1C269.3 181.1 279.8 181.9 287.7 180.1C295.6 178.2 299.8 172.7 299.8 172.7C299.8 172.7 301.7 170.3 303 167.4C304.3 164.5 304.7 162.6 304.8 162.3L305.6 158.9H292.1C292.1 158.9 291.4 167.8 284.1 168.6C276.8 169.4 273 169.1 271.5 169.1C270.1 169 262.3 169.4 262.9 162.9C262.9 162.8 262.9 162.7 262.9 162.5C263.2 155.1 264.1 153.2 264.1 153.2L306.4 153.1L308.2 142.6C310.5 130.7 309.1 121.6 298.2 118.1ZM295.3 141H266.3L267.4 136.4C267.4 136.4 268.4 132.8 270.4 131.3C272.4 129.8 275 129.5 277.4 129.3C279.8 129.1 286.2 128.6 291.5 129.7C293.2 130 294.9 131 295.3 132.5C296.4 135.8 295.3 141 295.3 141Z"/>
                <path d="M414.6 117.6L422.9 163.6L446.4 117.6L459.6 117.7L425.7 183.4C425.7 183.4 419.6 195.3 415.8 198.3C412 201.3 409.7 202.7 406.6 203C403.5 203.3 402.2 203.5 399.3 203L396.1 202.4L398.1 190.7C398.1 190.7 403.4 191.7 406.5 190.4C409.6 189.2 412.1 183.8 412.1 183.8L413.7 181.1L401.4 117.4L414.6 117.6Z"/>
                <path d="M464.5 123.8H478.1L478.9 118.5C478.9 118.5 480.4 108.9 483.6 107.1C484.6 106.5 486.3 106 488.3 105.6C491.9 105 496.4 104.9 500.1 105C505.8 105.2 507.9 105.3 513.7 105.9C519.5 106.6 518 112.1 518 112.1L516.9 120.4C516.9 120.4 516.4 124.1 515.1 126.4C513.9 128.5 510.7 129.9 508.8 130.5C504.3 132 488.9 135.9 488.9 135.9L476.8 139.4C476.8 139.4 469.4 141.6 465.2 146.1C461 150.7 459.4 155.9 458.8 158.7C458.2 161.4 455 180.3 455 180.3H520.3L522.5 167.3L470.9 167.4L471.8 162.1C471.8 162.1 472.4 156.6 474.6 154.8C475.3 154.2 475.6 153.5 479.8 152C482.3 151.1 490.7 148.9 490.7 148.9L510.2 143.6C510.2 143.6 520.8 140.9 525 135C529.2 129.2 530.8 118.1 530.8 118.1C530.8 118.1 531.9 107.3 531.1 103.9C530.2 100.5 527 96.5 523.2 94.7C519.3 93 515.3 91.9 503.5 92.1C491.8 92.3 485.9 92.8 480 95C474 97.2 470.6 101.2 468.4 106.8C465.9 112.3 464.5 123.8 464.5 123.8Z"/>
                <path d="M587.4 148.1L596.6 93.3H580.4L529.9 147.5L527.6 161.2H571.7L568.5 180.5H582.1L585.3 161.2H597.8L600 148.1H587.4ZM574 148.1H545.5L580.2 111.1L574 148.1Z"/>
                <path d="M100.2 100.4H141.8C141.8 100.4 151.1 92.9 157.7 88C164.3 83.2 176.4 75.5 176.4 75.5L152.9 64.5C152.9 64.5 133 76.8 124.6 82.6C116.4 88 100.2 100.4 100.2 100.4Z"/>
                <path d="M189.5 67.8L170.2 54.8C170.2 54.8 187.6 44.9 210.9 35.6C234.1 26.4 246.5 22.5 246.5 22.5L250.4 40.9C250.4 40.9 228.1 48.4 215.3 54.4C202.1 60.1 189.5 67.8 189.5 67.8Z"/>
                <path d="M264.7 36.9L261.3 18.1C261.3 18.1 285.1 11.8 306.9 7.70001C328.7 3.60001 357.6 1.70001 357.6 1.70001L348 30.8C348 30.8 322.6 27.3 298.7 30.6C280.2 32.8 264.7 36.9 264.7 36.9Z"/>
                <path d="M363.2 33.3L379.3 1.00001C379.3 1.00001 414.5 0.300007 444.9 5.00001C475.3 9.70001 503.1 16.9 502.5 17.2L425.4 57.5C425.4 57.5 407.4 46.1 385 39.1C372.4 35.4 363.2 33.3 363.2 33.3Z"/>
                <path d="M439.3 66.3L456.2 79.2H595.4C595.4 79.2 595.1 74.7 591.4 68.3C589.1 64.3 584.9 60.1 580.5 55.7C578.9 54.1 572.5 49.1 567.7 46C555.4 38 548.5 34.9 535.8 29.2L439.3 66.3Z"/>
                <path d="M109.2 117.5C104 117.5 99.0001 119.6 94.8001 121.9L95.5001 117.5H81.7001L70.6001 180.1H84.5001L90.6001 145.4C91.9001 138.4 97.1001 129.7 107.4 129.7H114.6L116.8 117.5H109.2V117.5Z"/>
            </svg>);
            default:
                return;
        }
    }

    const paypalbuttonSwitch = (payment) => {
        switch(payment) {
            case 'PayPal':
                return (
                <div>
                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} style={{ color: 'black' }}/>
                    <p>PayPal button goes here</p>
                </div>
                );
            case 'CreditCard': 
            return (
                <div>
                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} style={{ color: 'black' }} shippingPreference='SET_PROVIDED_ADDRESS'/>
                    <p>Credit card button goes here</p>
                </div>
            );
            case 'Przelewy24': 
            return (
                <div>
                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} style={{ color: 'black' }}/>
                    <p>Przelewy24 button goes here</p>
                </div>
            );
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
                                <li><p>{item.price}$</p></li>
                                <li><p>Size: {Math.floor(Math.random() * (47 - 38)) + 38}</p></li>
                                <li><p>Qty: {item.quantity}</p></li>
                                <li><p>Subtotal: {Math.round((item.price * item.quantity + Number.EPSILON) * 100) / 100}$</p></li>
                            </ul>
                        ))
                        }
                    </div>
                    <div className="summary__summ">
                        <h1>summary</h1>
                        <div className="summ-data">
                            <p><b>All items cost: </b><span>{order.itemsPrice.toFixed(2)} $</span></p>
                            <p><b>Shipping cost: </b><span>{order.shippingPrice.toFixed(2)} $</span></p>
                            <p><b>Tax: </b><span>{order.taxPrice.toFixed(2)} $</span></p>
                            <p id="summ-total"><b>Total cost: </b><span>{order.totalPrice.toFixed(2)} $</span></p>
                        </div>
                        {
                            !order.isPaid  && (
                                <div className="summ-paypal">
                                    {
                                        paypalbuttonSwitch(order.paymentMethod)
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
