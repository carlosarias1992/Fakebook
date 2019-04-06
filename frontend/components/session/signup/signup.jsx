import React from 'react';
import * as UiUtil from '../../../util/ui_util';
import { merge } from 'lodash';

const today = new Date();

const initialState = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    usernameValidation: '',
    month: today.getMonth(),
    day: today.getDate(),
    year: today.getFullYear() - 25,
    gender: '',
    modal: false,
    usernameValidationDisplay: false,
    usernameValidationModalMsg: 'Please re-enter your email address.'
};

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = merge(initialState, { errors: props.errors });
        this.handleSubmit = this.handleSubmit.bind(this);
        this.revealModal = this.revealModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleLoginError = this.handleLoginError.bind(this);
        this.toggleValidationModal = this.toggleValidationModal.bind(this);
    }

    componentDidMount() {
        this.setState({ errors: [] });
    }

    revealModal() {
        this.setState({ modal: true });
    }

    hideModal() {
        this.setState({ modal: false });
    }

    toggleValidationModal(element, displayValue, modalMessage) {
        if (element.value !== "") {
            this.setState({
                usernameValidationModalMsg: modalMessage
            });
        }

        UiUtil.toggleErrorDisplay(element.parentElement, displayValue);

        if (displayValue === "show") {
            UiUtil.removeSignupErrorClass(element);
        } else {
            UiUtil.addSignupErrorClass(element);
        }
    }

    validationModal(displayValue) {
        return (e) => {
            const element = e.target;
    
            if (!UiUtil.validEmail(element.value)) {
                this.toggleValidationModal(
                    element, 
                    displayValue, 
                    'Please enter a valid email.'
                );
            } else if (this.state.username !== this.state.usernameValidation) {
                this.toggleValidationModal(
                    element, 
                    displayValue, 
                    'Your emails do not match. Please try again.'
                );
            }
        };
    }

    handleLoginError(elements) {
        if (this.props.errors.length === 2) {
            UiUtil.addSignupErrorClass(elements[0]);
            UiUtil.addSignupErrorClass(elements[1]);
        } else if (this.props.errors[0].includes("Username")) {
            UiUtil.addSignupErrorClass(elements[0]);
        } else {
            UiUtil.addSignupErrorClass(elements[1]);
        }

        this.setState({ errors: this.props.errors });
    }

    handleInput(type) {
        return (e) => {
            const element = e.target;
            const value = element.value;

            if (value === "") {
                UiUtil.addSignupErrorClass(element);
            } else {
                if (type !== "gender" && type !== "month" && type !== "day" && type !== "year") {
                    UiUtil.toggleErrorDisplay(element.parentElement, "hide");
                }
                UiUtil.removeSignupErrorClass(element);
            }

            if (type === "username") {
                if (UiUtil.validEmail(value)) {
                    this.setState({ usernameValidationDisplay: true });
                } else {
                    this.setState({ 
                        usernameValidation: '',
                        usernameValidationDisplay: false
                    });
                }
            } 

            this.setState({ [type]: value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        const birth_date = new Date(
            this.state.year,
            this.state.month,
            this.state.day
        );

        const {
            usernameValidationDisplay,
            gender,
            username,
            usernameValidation,
            first_name,
            last_name,
            password,
        } = this.state;

        const user = {
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: password,
            gender: gender,
            birth_date
        };

        const allInputs = Array.from(e.target.querySelectorAll("input"));
        let validSignup = true;

        for (let i = 0; i < allInputs.length - 3; i++) {
            const element = allInputs[i];

            if (element.value === "" && validSignup) {
                validSignup = false;
                element.click();
            }

            if (element.value === "") {
                UiUtil.addSignupErrorClass(element);
            }
        }

        if (gender === "") {
            UiUtil.addSignupErrorClass(allInputs[5]);
            validSignup = false;
        }

        if (usernameValidationDisplay && username !== usernameValidation) {
            UiUtil.addSignupErrorClass(allInputs[3]);
            validSignup = false;
        }

        if (validSignup) {
            this.props.signup({ user })
                .then(
                    null,
                    () => this.handleLoginError(allInputs.slice(2, 4))
                );
        }

        this.props.removeErrors();
    }

    render() {
        const {
            first_name,
            last_name,
            username,
            password,
            month,
            day,
            year,
            gender,
            errors,
            usernameValidationDisplay,
            usernameValidation,
            usernameValidationModalMsg
        } = this.state;

        const femaleChecked = gender === "F" ? true : false;
        const maleChecked = gender === "M" ? true : false;

        let signupModal = [
            <div className="outer-modal" key="modal">
                <section className="signup-modal">
                    <p>
                        <strong>Providing your birthday</strong> helps make sure
                        you get the right Fakebook experience for your age. If
                        you want to change who sees this, go to the About section
                        of your profile. For more details, please visit our &nbsp;
                        <strong>Data Policy</strong>.
                    </p>
                    <hr />
                    <button onClick={this.hideModal}>Okay</button>
                </section>
            </div>
        ];

        signupModal = this.state.modal ? signupModal : null

        let formTitle, formClass;
        if (this.props.failedSignup) {
            formTitle = "Create a New Account";
            formClass = "signup failed-signup";
        } else {
            formTitle = "Sign Up";
            formClass = "signup";
        }
        
        return (
            <section className={formClass}>
                <h1>{formTitle}</h1>
                <h3>It's free and always will be.</h3>

                {errors && errors.length !== 0 ? 
                    <div className="session-errors">
                        {errors.join(", ")}
                    </div> : null
                }

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
                            onFocus={UiUtil.errorModal("show")}
                            onBlur={UiUtil.errorModal("hide")}
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
                            onFocus={UiUtil.errorModal("show")}
                            onBlur={UiUtil.errorModal("hide")}
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
                            onFocus={UiUtil.errorModal("show")}
                            onBlur={UiUtil.errorModal("hide")}
                        />
                        <i className=""></i>
                    </div>
                    {usernameValidationDisplay ? 
                    <div className="position-relative">
                        <div className="error-display hide">
                            {usernameValidationModalMsg}
                        </div>
                        <input
                            className=""
                            type="text"
                            placeholder="Re-enter email"
                            value={usernameValidation}
                            onChange={this.handleInput("usernameValidation")}
                            onFocus={this.validationModal("show")}
                            onBlur={this.validationModal("hide")}
                        />
                        <i className=""></i>
                    </div> : null}
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
                            onFocus={UiUtil.errorModal("show")}
                            onBlur={UiUtil.errorModal("hide")}
                        />
                        <i className=""></i>
                    </div>
                    <label className="birthday">Birthday
                        <div>
                            <select
                                value={month}
                                onChange={this.handleInput("month")}
                            >
                                {<UiUtil.monthOptions />}
                            </select>
                            <select
                                value={day}
                                onChange={this.handleInput("day")}
                            >
                                {<UiUtil.dayOptions />}
                            </select>
                            <select
                                value={year}
                                onChange={this.handleInput("year")}
                            >
                                {<UiUtil.yearOptions />}
                            </select>

                            <span
                                className="why-birthday"
                                onMouseEnter={this.revealModal}
                                onMouseLeave={this.hideModal}
                            >
                                Why do I need to provide my birthday?
                            {signupModal}
                            </span>
                        </div>

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
                        By clicking Sign Up, you agree to our &nbsp;
                        <strong>Terms</strong>,&nbsp;<strong>Data Policy</strong>
                        &nbsp; and <strong>Cookies Policy.</strong>&nbsp; You may receive
                        SMS Notifications from us and can opt out any time.
                    </p>

                    <div className="signup-buttons">
                        <input type="submit" value="Sign Up" />
                        <button
                            onClick={this.props.demoLogin}
                            className="demo-button"
                            type="button"
                        >Demo Login</button>
                    </div>
                </form>
            </section>
        );
    }
}

export default Signup;