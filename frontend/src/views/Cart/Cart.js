import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { addToCartAction, removeFromCartAction } from '../../actions/cartActions'
import ErrorMessageBox from '../../components/ErrorMessageBox/ErrorMessageBox'
import './Cart.scss'

export default function Cart(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    
    useEffect(()=> {
        dispatch(addToCartAction(productId, quantity));
    }, [dispatch, productId, quantity]);

    const removeFromCart = (id) => {
        dispatch(removeFromCartAction(id));
    }

    const proceedToCheckout = () => {
        props.history.push('/signin?redirect=shipping');
    }

    const paypalHandler = () => {

    }
    
    return (
        <div>
        {
            cartItems.length === 0
            ? <ErrorMessageBox err={'The cart is empty'} />
            : <div className="cart__wrapper">
                <table className="cart__table">
                    <tr className="table__heading-row">
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                    {
                        // TODO: implement empty cart error
                        cartItems.map((item, index) => (
                            <tbody>
                                <tr key={index}>
                                    <td>
                                        <Link to={`/item/${item.product}`}>
                                            <img src={item.image} alt={item.name}/>
                                        </Link>
                                    </td>
                                    <td>
                                        <p>{item.price}$</p>
                                    </td>
                                    <td>
                                    <div className="counter table__counter">
                                        <select className="content__wrapper" value={item.quantity} onChange={(e) => {dispatch(addToCartAction(item.product, Number(e.target.value)))}}>
                                        {
                                            [...Array(item.inStock).keys()].map((x) => (
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                            ))
                                        }
                                        </select>
                                        <i className="fa fa-angle-right"></i>
                                    </div>
                                    </td>
                                    <td>{Math.round((item.price * item.quantity + Number.EPSILON) * 100) / 100}$</td>
                                    <td>
                                        <button onClick={() => removeFromCart(item.product)}>
                                            <svg height="30px" width="36px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0"/><path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0" fill="#fafafa"/></svg>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Link to={`/item/${item.product}`}>
                                            <h3>{item.name}</h3>
                                        </Link>
                                        <p>Size: {Math.floor(Math.random() * (47 - 38)) + 38}</p>
                                    </td>
                                </tr>
                                <br/>
                            </tbody>
                        ))
                    }
                </table>
                <div className="cart__summary">
                    <hr/>
                    <h3>Cart total</h3>
                    <h2>{Math.round((cartItems.reduce((accumulator, current) => accumulator + current.price * current.quantity, 0) + Number.EPSILON) * 100) / 100}$</h2>
                    <p>Shipping and taxes are calculated at checkout</p>
                    <div className="summary__terms-and-conditions">
                        <input type="checkbox" name="terms"/>
                        <label for="terms">I agree to <span>Terms & conditions</span></label>
                    </div>
                    <div className="summary__buttons">
                        <button onClick={proceedToCheckout} className="summary__checkout-button">Checkout <i className="fa fa-credit-card"></i></button>
                        <button onClick={paypalHandler} className="summary__checkout-button">Paypal <i className="fa fa-paypal"></i></button>
                    </div>
                    <hr />
                </div>
            </div>
        }
        </div>
    )
}
