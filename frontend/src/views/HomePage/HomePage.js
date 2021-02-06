import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { orderHistoryAction } from '../../actions/orderActions';
import './HomePage.scss'

export default function HomePage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderHistoryAction());
    }, [dispatch]);

    return (
        <div className="home__background">
            <div className="home__heading">
                <h1>Modern e-commerce shoe store</h1>
                <hr />
                <h3>You can buy any shoes that will match your needs. Anytime. Anywhere.</h3>
                <a href="/products-list" className="heading__button"><span>See our products<i className="fa fa-angle-right"></i></span></a>
            </div>
            <p className="home__copyright">© E-Shoerr 2020</p>
        </div>
    )
}
