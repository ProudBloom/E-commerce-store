import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.scss'

export default function SingIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const submitHandler = (e) => {
        e.preventDefault();
        //TODO: signin action
    }

    return (
        <div className="signin__wrapper">
            <div className="signin__form">
                <h1>Login</h1>
                <div className="form__input">
                    <input class="balloon" id="email" type="email" placeholder="Your email?" />
                    <label for="email">Email</label>
                </div>
                <div className="form__input">
                    <input class="balloon" id="password" type="password" placeholder="Your password?" />
                    <label for="password">Password</label>
                </div>
                <div>
                    <button className="singin__button" type="submit"><span>Sign in</span></button>
                </div>
                <div className="signin__new-account">
                    Are you a new member? <Link to="/register">Ceate a new account</Link>
                </div>
            </div>
        </div>
    )
}