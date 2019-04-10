import React from 'react';
import { Link } from 'react-router-dom';
import LoginContainer from '../login/login_container';

export default (props) => {
    const { signupButton, hide } = props;

    return (
        <header className="main-header">
            <section className="container flex-space-between">
                <Link to="/">
                    <div className="logo"></div>
                </Link>
                {
                    signupButton ? 
                        <Link className="create-account small" to="/signup">
                            Create New Account
                        </Link> 
                    : 
                        null
                }
                {hide ? null : <LoginContainer />}
            </section>
        </header>
    );
};