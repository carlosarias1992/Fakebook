import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
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
            .then(null, () => this.setState({ password: '' }));
    }

    render() {
        const { username, password } = this.state;

        return (
            <form className="login-form" onSubmit={this.handleSubmit}>
                <label>Email or Phone
                    <input 
                        type="text" 
                        name="user[username]" 
                        value={username}
                        onChange={this.handleInput("username")}
                    />
                </label>
                <label>Password
                    <input 
                        type="password" 
                        name="user[password]" 
                        value={password}
                        onChange={this.handleInput("password")}
                    />
                    <Link to="/forgot-account">
                        <span className="forgot-account">Forgot account?</span>
                    </Link>
                </label>
                <input type="submit" value="Log In" />
            </form>
        );
    }
}

export default Login