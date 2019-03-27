import React from 'react';
import Header from '../header/header';
import LoginFormContainer from './failed_login_form_container';
import Footer from '../../footer';

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
                <Footer />
            </main>
        );
    }
}

export default FailedLogin;