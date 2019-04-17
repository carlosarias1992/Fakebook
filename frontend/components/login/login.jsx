import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { 
    addSignupErrorClass,
    removeSignupErrorClass,
    toggleErrorDisplay,
    errorModal
} from '../../util/ui_util';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', failedLogin: false };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoginError = this.handleLoginError.bind(this);
    }

    componentDidMount() {
        const usernameInput = document.querySelector("input");
        usernameInput.focus();
    }

    handleLoginError(element, boolean) {
        this.setState({ password: '', failedLogin: boolean });
        addSignupErrorClass(element);
        toggleErrorDisplay(element.parentElement, "show");
    }

    handleInput(type) {
        return (e) => {
            const element = e.target;
            const value = element.value;

            if (this.props.showErrors) {
                if (value === "") {
                    addSignupErrorClass(element);
                } else {
                    if (type !== "gender") {
                        toggleErrorDisplay(element.parentElement, "hide");
                    }
                    removeSignupErrorClass(element);
                }
            }

            this.setState({ [type]: value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const { login } = this.props;
        const { username, password } = this.state;

        if (this.props.showErrors) {
            let validLogin = true;
            const usernameInput = document.querySelector('input[type="text"]');
            const passwordInput = document.querySelector('input[type="password"]');
            
            if (username === "") {
                validLogin = false;
                addSignupErrorClass(usernameInput);
                usernameInput.focus();
            } else if(password === "") {
                validLogin = false;
                addSignupErrorClass(passwordInput);
                passwordInput.focus();
            }

            if (validLogin) {
                login({ user: this.state })
                    .then(
                        null, 
                        () => this.handleLoginError(usernameInput, false)
                    );
            }
        } else {
            login({ user: this.state })
                .then(
                    null, 
                    () => this.setState({ password: '', failedLogin: true })
                );
        }
    }

    render() {
        const { className } = this.props;
        const { username, password } = this.state;
        let usernamePlaceholder, passwordPlaceholder;
        let usernameLabel, passwordLabel, footer;
        let onBlurCallback, onFocusCallback;

        if (className === "failed-login-form") {
            usernamePlaceholder = "Email or Phone Number";
            passwordPlaceholder = "Password";
            onFocusCallback = errorModal("show");
            onBlurCallback = errorModal("hide");

            footer = 
                <footer>
                    <div className="or-container">
                        <hr />
                        <p>or</p>
                        <hr />
                    </div>
                    <Link className="create-account" to="/signup">
                        Create New Account
                    </Link>
                </footer>;
        } else {
            usernameLabel = "Email or Phone";
            passwordLabel = "Password";
        }

        

        return (
            <>
                {this.state.failedLogin ? <Redirect to="/login" redirect="true"/> : null}
                <form className={this.props.className} onSubmit={this.handleSubmit}>
                    <label>{usernameLabel}
                        <div className="position-relative input">
                            <div className="error-display hide">
                                The credentials you've entered are not valid. 
                            </div>
                            <input
                                type="text"
                                name="user[username]"
                                value={username}
                                placeholder={usernamePlaceholder}
                                onChange={this.handleInput("username")}
                                onFocus={onFocusCallback}
                                onBlur={onBlurCallback}
                            />
                            <i className=""></i>
                        </div>
                    </label>
                    <label>{passwordLabel}
                        <div className="position-relative input">
                            <div className="error-display hide">
                                Enter your password.
                            </div>
                            <input 
                                type="password" 
                                name="user[password]" 
                                value={password}
                                placeholder={passwordPlaceholder}
                                onChange={this.handleInput("password")}
                                onFocus={onFocusCallback}
                                onBlur={onBlurCallback}
                            />
                            <i className=""></i>
                        </div>
                    </label>
                    <input type="submit" value="Log In" />
                    {footer}
                </form>
            </>
        );
    }
}

export default Login