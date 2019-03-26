import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', failedLogin: false };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(type) {
        return (e) => {
            this.setState({ [type]: e.target.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.login({ user: this.state })
            .then(null, () => this.setState({ password: '', failedLogin: true}));
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
                        <input 
                            type="text" 
                            name="user[username]" 
                            value={username}
                            placeholder={usernamePlaceholder}
                            onChange={this.handleInput("username")}
                        />
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