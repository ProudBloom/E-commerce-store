import React from 'react'
import './CheckoutProgress.scss'

export default function CheckoutProgress(props) {
    return (
        <div className="checkout-progress__wrapper">
            <div className={props.step1 ? 'active' : ''}>Sign-In</div>
            <div className={props.step2 ? 'active' : ''}>Shipping</div>
            <div className={props.step3 ? 'active' : ''}>Payment</div>
            <div className={props.step4 ? 'active' : ''}>Order</div>
        </div>
    )
}
