import React from 'react';
import { Link } from 'react-router-dom';
import * as UiUtil from '../../../util/ui_util';

const today = new Date();

const initialState = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    month: today.getMonth(),
    day: today.getDate(),
    year: today.getFullYear(),
    gender: '',
    modal: false
};

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.revealModal = this.revealModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    revealModal() {
        return (e) => this.setState({ modal: true });
    }

    hideModal() {
        return (e) => this.setState({ modal: false });
    }

    handleInput(type) {
        return (e) => this.setState({ [type]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const birth_date = new Date(
            this.state.year,
            this.state.month, 
            this.state.day
        );

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
            password: this.state.password,
            gender: this.state.gender,
            birth_date
        };

        this.props.signup({ user })
            .then(null, () => this.setState({ password: '' }));
    }

    render () {
        const { 
            first_name,
            last_name,
            username,
            password,
            month, 
            day, 
            year, 
            gender
        } = this.state;

        const femaleChecked = gender === "F" ? true : false;
        const maleChecked = gender === "M" ? true : false;

        let signupModal = [
            <div className="outer-modal" key="modal">
                <section className="signup-modal">
                    <p>
                        <strong>Providing your birthday</strong> helps make sure you get the
                        right Fakebook experience for your age. If you want
                        to change who sees this, go to the About section of
                        your profile. For more details, please visit our
                    <Link to="/">Data Policy</Link>.
                    </p>
                    <hr />
                    <button onClick={this.hideModal()}>Okay</button>
                </section>
            </div>
        ];

        signupModal = this.state.modal ? signupModal : null

        return (
            <section className="signup">
                <h1>Sign Up</h1>
                <h3>It's free and always will be.</h3>

                <form className="signup-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        className="name-input" 
                        placeholder="First name" 
                        value={first_name}
                        onChange={this.handleInput("first_name")}
                        />
                    <input 
                        type="text" 
                        className="name-input" 
                        placeholder="Last name" 
                        value={last_name}
                        onChange={this.handleInput("last_name")}
                        />
                    <input 
                        type="text" 
                        placeholder="Mobile number or email" 
                        value={username}
                        onChange={this.handleInput("username")}
                        />
                    <input 
                        type="password" 
                        placeholder="New password" 
                        value={password}
                        onChange={this.handleInput("password")}
                        />

                    <label className="birthday">Birthday<br />
                        <select 
                            value={month} 
                            onChange={this.handleInput("month")}
                            >
                            {<UiUtil.monthOptions/>}
                        </select>
                        <select 
                            value={day} 
                            onChange={this.handleInput("day")}
                            >
                            {<UiUtil.dayOptions />}
                        </select>
                        <select 
                            value={year - 25} 
                            onChange={this.handleInput("year")}
                            >
                            {<UiUtil.yearOptions />}
                        </select>

                        <span 
                            className="why-birthday"
                            onMouseEnter={this.revealModal()}
                            onMouseLeave={this.hideModal()}
                            >
                            Why do I need to provide my birthday?
                            {signupModal}
                        </span>

                    </label>

                    <div className="gender">
                        <input 
                            type="radio" 
                            onChange={this.handleInput("gender")}
                            value="F"
                            checked={femaleChecked}
                            />Female
                        <input 
                            type="radio" 
                            onChange={this.handleInput("gender")}
                            value="M"
                            checked={maleChecked}
                            />Male
                    </div>

                    <p className="fineprint">
                        By clicking Sign Up, you agree to our
                        <Link to="/">Terms</Link>, <Link to="/">Data Policy</Link> and
                        <Link to="/">Cookies Policy.</Link> You may receive
                        SMS Notifications from us and can opt out any time.
                    </p>

                    <div className="signup-buttons">
                        <input type="submit" value="Sign Up" />
                    </div>

                    <footer className="signup-footer">
                        <hr />
                        <p>
                            <Link to="/">Create a Page</Link>
                            for a celebrity, band or business.
                        </p>
                    </footer>
                </form>

                <button
                    onClick={this.props.demoLogin}
                    className="demo-button"
                >Demo Login</button>
            </section>
        );
    }
}

export default Signup;