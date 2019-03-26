import React from 'react';
import Header from '../header/header';
import { Link } from 'react-router-dom';
import LoginFormContainer from './failed_login_form_container';

class FailedLogin extends React.Component {
    handleErrors() {
        
    }

    render() {
        return (
            <main>
                <Header hide="true" signupButton="true" />
                <section className="flex-center outer-login-body">
                    <section className="container flex-middle login-body">
                        <div className="outer-login-form">
                            <h4>Log Into Facebook</h4>
                            <LoginFormContainer />
                        </div>
                    </section>
                </section>
                <footer className="flex-center main-footer">
                    <section className="container">
                        <section className="top-footer">
                            <span>English (US)</span>
                            <Link to="/">Español</Link>
                            <Link to="/">Français (France)</Link>
                            <Link to="/">中文(简体)</Link>
                            <Link to="/">العربية</Link>
                            <Link to="/">Português (Brasil)</Link>
                            <Link to="/">Italiano</Link>
                            <Link to="/">한국어</Link>
                            <Link to="/">Deutsch</Link>
                            <Link to="/">हिन्दी</Link>
                            <Link to="/">日本語</Link>
                        </section>
                        <hr />
                        <section className="sub-footer">
                            <Link to="/">Sign Up</Link>
                            <Link to="/">Log In</Link>
                            <Link to="/">Messenger</Link>
                            <Link to="/">Facebook Lite</Link>
                            <Link to="/">Find</Link>
                            <Link to="/">Friends</Link>
                            <Link to="/">People</Link>
                            <Link to="/">Profiles</Link>
                            <Link to="/">Pages</Link>
                            <Link to="/">Page Categories</Link>
                            <Link to="/">Places</Link>
                            <Link to="/">Games</Link>
                            <Link to="/">Locations</Link>
                            <Link to="/">Marketplace</Link>
                            <Link to="/">Groups</Link>
                        </section>
                        <section className="sub-footer">
                            <Link to="/">Instagram</Link>
                            <Link to="/">Local</Link>
                            <Link to="/">Fundraisers</Link>
                            <Link to="/">About</Link>
                            <Link to="/">Create Page</Link>
                            <Link to="/">Create Ad</Link>
                            <Link to="/">Developers</Link>
                            <Link to="/">Careers</Link>
                            <Link to="/">Privacy</Link>
                            <Link to="/">Cookies</Link>
                            <Link to="/">Ad Choices</Link>
                            <Link to="/">Terms</Link>
                            <Link to="/">Account Security</Link>
                        </section>
                        <section className="sub-footer">
                            <Link to="/">Login Help</Link>
                            <Link to="/">Help</Link>
                        </section>
                        <span className="copyright">
                            Fakebook by Carlos Arias-Miranda 2019. Inspired by
                            Facebook. Connect with me on
                        <Link className="social-media" to="https://www.linkedin.com/in/carlos-arias-miranda-a98025172/">LinkedIn</Link> or
                        <Link className="social-media" to="https://github.com/carlosarias1992">Github</Link>.
                    </span>
                    </section>
                </footer>
            </main>
        );
    }
}

export default FailedLogin;