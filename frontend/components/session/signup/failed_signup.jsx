import React from 'react';
import SignupFormContainer from './failed_signup_form_container';
import Header from '../header/header';
import Footer from '../../footer';

class FailedSignup extends React.Component {
    render() {
        return (
            <main>
                <Header hide="true" signupButton="true" />
                <section className="flex-center outer-login-body">
                    <section className="container flex-middle login-body">
                        <SignupFormContainer />
                    </section>
                </section>
                <Footer />
            </main>
        );
    }
}

export default FailedSignup;