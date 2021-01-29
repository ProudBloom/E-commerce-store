import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethodAction } from '../../actions/cartActions';
import CheckoutProgress from '../../components/CheckoutProgress/CheckoutProgress'
import './Payment.scss'

export default function Payment(props) {

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const signin = useSelector(state => state.signin);
    const { userInfo } = signin;

    if(!userInfo) {
        props.history.push('/signin');
    }

    const dispatch = useDispatch();
    useEffect(() => {
        document.getElementById('paypal-button').focus();
    }, [])

    const submitHandler = () => {
        dispatch(savePaymentMethodAction(paymentMethod));
        props.history.push('/summary');
    }

    return (
        <div className="payment__wrapper">
            <CheckoutProgress step1 step2 step3/>
            <div className="payments">
                <h1>Select payment method</h1>
                <div className="payment__button-wrapper">
                {/* TODO: implement buttons as radio (so user can't unfocus them) */}
                    <button onClick={ () => setPaymentMethod('CreditCard') } className="payment__button">
                        <i className="fa fa-credit-card"></i>
                        <p>Credit card</p>
                    </button>
                    <button id="paypal-button" onClick={ () => setPaymentMethod('PayPal') } className="payment__button">
                        <i className="fa fa-paypal"></i>
                        <p>PayPal</p>
                    </button>
                </div>
                <div className="submit__wrapper">
                    <button className="payment__button" onClick={submitHandler}><span>Continue</span></button>
                </div>
            </div>
        </div>
    )
}
