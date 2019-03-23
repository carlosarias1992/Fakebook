import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <form className="login-form">
            <label>Email or Phone
                        <input type="text" />
            </label>
            <label>Password
                        <input type="text" />
                <Link to="/forgot-account">
                    <span className="forgot-account">Forgot account?</span>
                </Link>
            </label>
            <input type="submit" value="Log In" />
        </form>
    );
};