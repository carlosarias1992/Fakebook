import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../login/login';

export default (props) => {
    return (
        <header className="main-header">
            <section className="container flex-space-between">
                <Link to="/">
                    <div className="logo"></div>
                </Link>
                <Login />
            </section>
        </header>
    );
};