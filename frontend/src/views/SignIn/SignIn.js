import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userSigninAction } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import ErrorMessageBox from '../../components/ErrorMessageBox/ErrorMessageBox';
import './SignIn.scss'

// TODO: fix error (Constant loading on wrong password - email: works)

export default function SingIn(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const signIn = useSelector(state => state.signin);
    const { userInfo, isLoading, error } = signIn;
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userSigninAction(email, password));
    }

    useEffect( () => {
        if(userInfo) {
            //Redirect user to the specified url after login
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div className="custom-form__wrapper">
        {
            isLoading ? (<LoadingBox></LoadingBox>) 
            : error ? (<ErrorMessageBox err={error}/>)
            : <form className="custom-form" onSubmit={submitHandler}>
                <h1>Login</h1>
                <div className="form__input">
                    <input className="balloon" id="email" type="email" placeholder="Your email?" required onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form__input">
                    <input className="balloon" id="password" type="password" placeholder="Your password?" required onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                </div>
                <div>
                    <button className="custom-form__button" type="submit"><span>Sign in</span></button>
                </div>
                <div className="custom-form__sublink">
                    Are you a new member? <Link to={`/register?redirect=${redirect}`}>Ceate a new account</Link>
                </div>
            </form>
        }
        </div>
    )
}