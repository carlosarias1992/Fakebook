import React from 'react';
import { Link } from 'react-router-dom';
import LoginContainer from '../login/login_container';

export default (props) => {
    return (
        <header className="main-header">
            <section className="container flex-space-between">
                <Link to="/">
                    <div className="logo"></div>
                </Link>
                <LoginContainer />
            </section>
        </header>
    );
};