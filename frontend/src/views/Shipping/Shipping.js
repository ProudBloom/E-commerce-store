import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddressAction } from '../../actions/cartActions';
import CheckoutProgress from '../../components/CheckoutProgress/CheckoutProgress'

export default function Shipping(props) {

    const userSignin = useSelector(state => state.signin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if(!userInfo) {
        props.history.push('signin');
    }

    const [fullname, setFullname] = useState(shippingAddress.fullname);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [zip, setZip] = useState(shippingAddress.zip);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddressAction({ fullname, address, city, zip, country }));
        props.history.push('/payment');
    }

    return (
        <div>
            <CheckoutProgress step1 step2></CheckoutProgress>
            <div className="custom-form__wrapper">
                <form className="custom-form" onSubmit={submitHandler}>
                    <h1>Shipping</h1>
                    <div className="form__input">
                        <input value={fullname} className="balloon" id="fullname" type="text" placeholder="Full name" required onChange={(e) => setFullname(e.target.value)}/>
                        <label htmlFor="fullname">Name</label>
                    </div>
                    <div className="form__input">
                        <input value={address} className="balloon" id="address" type="text" placeholder="Address" required onChange={(e) => setAddress(e.target.value)}/>
                        <label htmlFor="address">Address</label>
                    </div>
                    <div className="form__input">
                        <input value={city} className="balloon" id="city" type="text" placeholder="City" required onChange={(e) => setCity(e.target.value)}/>
                        <label htmlFor="city">City</label>
                    </div>
                    <div className="form__input">
                        <input value={zip} className="balloon" id="zip" type="text" placeholder="Zip code" required onChange={(e) => setZip(e.target.value)}/>
                        <label htmlFor="zip">Zip Code</label>
                    </div>
                    <div className="form__input">
                        <input value={country} className="balloon" id="country" type="text" placeholder="Cpuntry" required onChange={(e) => setCountry(e.target.value)}/>
                        <label htmlFor="country">Country</label>
                    </div>
                    
                    <div>
                        <button className="custom-form__button" type="submit"><span>Continue</span></button>
                    </div>
                </form>
            </div>
        </div>
    )
}
