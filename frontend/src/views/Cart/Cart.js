import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { addToCartAction } from '../../actions/cartActions'
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

    }
    
    return (
        <div>
        {
            cartItems.length === 0
            ? <ErrorMessageBox err={'The cart is empty'} />
            : <div>
                <table>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                    {
                        // TODO: implement empty cart error
                        cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <Link to={`/item/${item.product}`}>
                                        <p>{item.name}</p>
                                    </Link>
                                </td>
                                <td>
                                    <p>{item.price}zł</p>
                                </td>
                                <td>
                                    <select value={item.quantity} onChange={(e) => {dispatch(addToCartAction(item.product), Number(e.target.value))}}>
                                    {
                                        [...Array(item.inStock).keys()].map((x) => (
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                        ))
                                    }
                                    </select>
                                </td>
                                <td>{item.price * item.quantity}zł</td>
                                <td>
                                    <a onClick={removeFromCart(item.product)}>
                                        <svg height="16px" viewBox="0 0 512 512" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#f44336"/><path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0" fill="#fafafa"/></svg>
                                    </a>
                                </td>
                            </tr>
                        ))
                    }
                </table>
                <div className="summary">
                        <hr/>
                        <h3>Cart total</h3>
                        <h4>
                            {cartItems.reduce((accumulator, current) => accumulator + current.price * current.quantity, 0)}zł
                        </h4>
                        <p>Shipping and taxes are calculated at checkout</p>
                        <input type="checkbox" name="terms"/>
                        <label for="terms">I agree to <span>Terms & conditions</span></label>
                        <button className="summary__checkout-button">Checkout <i class="fa fa-credit-card"></i></button>
                    </div>
            </div>
        }
        </div>
    )
}
