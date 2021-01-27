import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userRegisterAction } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import ErrorMessageBox from '../../components/ErrorMessageBox/ErrorMessageBox';
import '../SignIn/SignIn.scss'

export default function Register(props) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const register = useSelector(state => state.register);
    const { userInfo, isLoading, error } = register;
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('Password confirmation does not match password')
        }
        else {
            dispatch(userRegisterAction(name, email, password));
        }
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
                <h1>Register</h1>
                <div className="form__input">
                    <input className="balloon" id="name" type="text" placeholder="Your name?" required onChange={(e) => setName(e.target.value)}/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form__input">
                    <input className="balloon" id="email" type="email" placeholder="Your email?" required onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form__input">
                    <input className="balloon" id="password" type="password" placeholder="Your password?" required onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form__input">
                    <input className="balloon" id="confirm-password" type="password" placeholder="Confirm password" required onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <label htmlFor="confirm-password">Confrim Password</label>
                </div>
                <div>
                    <button className="custom-form__button" type="submit"><span>Register Me</span></button>
                </div>
                <div className="custom-form__sublink">
                    Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
                </div>
            </form>
        }
        </div>
    )
}