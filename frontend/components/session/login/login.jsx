import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { 
    addSignupErrorClass,
    removeSignupErrorClass,
    toggleErrorDisplay,
    errorModal
} from '../../../util/ui_util';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', failedLogin: false };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(type) {
        return (e) => {
            const element = e.target;
            const value = element.value;

            if (value === "") {
                addSignupErrorClass(element);
            } else {
                if (type !== "gender") {
                    toggleErrorDisplay(element.parentElement, "hide");
                }
                removeSignupErrorClass(element);
            }

            this.setState({ [type]: value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const { login } = this.props;

        if (this.props.showErrors) {
            let validLogin;
            const usernameInput = document.querySelector("input");

            if (this.state.username === "") {
                validLogin = false;
                usernameInput.click();
            }

            if (validLogin) {
                login({ user })
                    .then(null, () => this.setState({ password: '' }));
            }
        } else {
            login({ user: this.state })
                .then(null, () => this.setState({ password: '', failedLogin: true}));
        }
    }

    render() {
        const { className } = this.props;
        const { username, password } = this.state;
        let usernamePlaceholder, passwordPlaceholder;
        let usernameLabel, passwordLabel, footer, forgotAccountClass;

        if (className === "failed-login-form") {
            usernamePlaceholder = "Email or Phone Number";
            passwordPlaceholder = "Password";
            forgotAccountClass = "failed-forgot-account";

            footer = <footer>
                        <div className="or-container">
                            <hr />
                            <p>or</p>
                            <hr />
                        </div>
                        <Link className="create-account" to="/signup">Create New Account</Link>
                     </footer>;
        } else {
            usernameLabel = "Email or Phone";
            passwordLabel = "Password";
            forgotAccountClass = "forgot-account";
        }

        

        return (
            <>
                {this.state.failedLogin ? <Redirect to="/login" redirect="true"/> : null}
                <form className={this.props.className} onSubmit={this.handleSubmit}>
                    <label>{usernameLabel}
                        <div className="position-relative input">
                            <div className="error-display hide">
                                The email or phone number you've entered 
                                doesn't match any account. 
                                <Link to="/signup">Sign up for an account</Link>
                            </div>
                            <input
                                type="text"
                                name="user[username]"
                                value={username}
                                placeholder={usernamePlaceholder}
                                onChange={this.handleInput("username")}
                                onClick={errorModal("show")}
                            />
                            <i className=""></i>
                        </div>
                    </label>
                    <label>{passwordLabel}
                        <input 
                            type="password" 
                            name="user[password]" 
                            value={password}
                            placeholder={passwordPlaceholder}
                            onChange={this.handleInput("password")}
                        />
                        <Link to="/forgot-account">
                            <span className={forgotAccountClass}>Forgot account?</span>
                        </Link>
                    </label>
                    <input type="submit" value="Log In" />
                    {footer}
                </form>
            </>
        );
    }
}

export default Login