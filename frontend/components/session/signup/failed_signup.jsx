import React from 'react';
import SignupFormContainer from './failed_signup_form_container';
import Header from '../header/header';
import Footer from '../../footer';

class FailedSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loginForm: false };
    }

    render() {
        let header, loginForm;

        if (this.state.loginForm) {
            header = <Header />;
        } else {
            header = <Header hide="true" />;
            loginForm = 
                <form className="login-form failed-signup-login-button">
                    <input
                        type="submit"
                        value="Log Into Existing Account"
                        onClick={() => this.setState({ loginForm: true })}
                    />
                </form>;
        }

        return (
            <main>
                {header}
                <section className="flex-center outer-login-body">
                    <section className="container flex-middle login-body">
                        {loginForm}
                        <SignupFormContainer />
                    </section>
                </section>
                <Footer />
            </main>
        );
    }
}

export default FailedSignup;