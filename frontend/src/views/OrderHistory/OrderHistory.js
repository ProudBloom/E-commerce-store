import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import ErrorMessageBox from '../../components/ErrorMessageBox/ErrorMessageBox'
import { orderHistoryAction } from '../../actions/orderActions';
import './OrderHistory.scss'

export default function OrderHistory(props) {

    const dispatch = useDispatch();
    const orderHistory = useSelector(state => state.orderHistory);
    const { loading, error, orders} = orderHistory;
    const signin = useSelector(state => state.signin);
    const { userInfo } = signin;

    if(!userInfo) {
        props.history.push('/signin');
    }
    
    //TODO: Somehow orders are undefined after dispatching action here (dispatched in homescreen instead)
    useEffect(() => {
        dispatch(orderHistoryAction());
    }, [dispatch]);

    return (
        loading 
        ? <LoadingBox/> 
            : error 
            ? <ErrorMessageBox>{error}</ErrorMessageBox>
            : (
                <div className="orderhistory__wrapper">
                    <table className="orderhistory__table">
                    <tr className="orderhistory__heading-row">
                        <th>ID</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th>Actions</th>
                    </tr>
                        <tbody>
                        {
                            orders.map((item, index) => (
                                <tr key={index}>
                                    <td>{item._id}</td>
                                    <td>{item.createdAt.substr(0, 10)}</td>
                                    <td>{item.paymentMethod}</td>
                                    <td>{item.totalPrice.toFixed(2)}$</td>
                                    <td>{item.isPaid ? item.paidAt.substr(0, 10) : 'Not paid'}</td>
                                    <td>{item.isDelivered ? item.deliveredAt.substr(0, 10) : 'Not delivered'}</td>
                                    <td>
                                        <button type="button" className="orderhistory__button" onClick={() => props.history.push(`/order/${item._id}`)}>See details</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                </div>
            )
    )
}
