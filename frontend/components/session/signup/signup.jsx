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
    modal: false,
    firstNameModal: false,
    lastNameModal: false,
    usernameModal: false,
    passwordModal: false
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
        return (e) => {
            const element = e.target;
            const value = element.value;
            
            if (value === "") {
                this.addSignupErrorClass(element);
            } else {
                if (type !== "gender") {
                    this.toggleErrorDisplay(element.parentElement, "hide");
                }
                this.removeSignupErrorClass(element);
            } 

            this.setState({ [type]: value });
        };
    }

    toggleErrorDisplay(parentElement, displayProperty) {
        const display = parentElement.children[0];
        const displayClass = display.className.split(" ");

        display.className = displayClass[0] + " " + displayProperty;
    }

    errorModal(displayValue) {
        return (e) => {
            const element = e.target;

            if (element.value === "") {
                this.toggleErrorDisplay(element.parentElement, displayValue);
            }
        };
    }

    addSignupErrorClass(element) {
        const parentElement = element.parentElement;
        const inputElement = parentElement.children[1];
        const icon = parentElement.children[2];
        
        inputElement.className += " input-error";
        icon.className += " error-icon";
    }

    removeSignupErrorClass(element) {
        const parentElement = element.parentElement;
        const inputElement = parentElement.children[1];
        const icon = parentElement.children[2];

        const inputClass = inputElement.className.split(" ")[0];
        inputElement.className = inputClass;

        icon.className = "";
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

        const allInputs = Array.from(e.target.querySelectorAll("input"));
        let validSignup = true;

        for(let i = 0; i < allInputs.length - 3; i++) {
            const element = allInputs[i];

            if (element.value === "" && validSignup) {
                validSignup = false;
                element.click();
            } 

            if (element.value === "") {
                this.addSignupErrorClass(element);
            }
        }

        if (this.state.gender === "") {
            this.addSignupErrorClass(allInputs[4]);
            validSignup = false;
        }

        if (this.state.password.length < 6) {
            this.addSignupErrorClass(allInputs[3]);
            validSignup = false;
        }

        if (validSignup) {
            this.props.signup({ user })
                .then(null, () => this.setState({ password: '' }));
        }
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
                    <div className="position-relative input">
                        <div className="error-display hide">
                            What's your name?
                        </div>
                        <input
                            type="text"
                            className="name-input"
                            placeholder="First name"
                            value={first_name}
                            onChange={this.handleInput("first_name")}
                            onClick={this.errorModal("show")}
                        />
                        <i className=""></i>
                    </div>
                    <div className="position-relative input">
                        <div className="error-display hide">
                            What's your name?
                        </div>
                        <input 
                            type="text" 
                            className="name-input" 
                            placeholder="Last name" 
                            value={last_name}
                            onChange={this.handleInput("last_name")}
                            onClick={this.errorModal("show")}
                            />
                        <i className=""></i>
                    </div>
                    <div className="position-relative">
                        <div className="error-display hide">
                            You'll use this when you log in and if you ever 
                            need to reset your password.
                        </div>
                        <input 
                            className=""
                            type="text" 
                            placeholder="Mobile number or email" 
                            value={username}
                            onChange={this.handleInput("username")}
                            onClick={this.errorModal("show")}
                            />
                        <i className=""></i>
                    </div>
                    <div className="position-relative input">
                        <div className="error-display hide">
                            Enter a combination of at least six numbers,
                            letters and punctuation marks (like ! and &).
                        </div>
                        <input 
                            type="password" 
                            placeholder="New password" 
                            value={password}
                            onChange={this.handleInput("password")}
                            onClick={this.errorModal("show")}
                            />
                        <i className=""></i>
                    </div>
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
                        <i className="radio-error"></i>
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