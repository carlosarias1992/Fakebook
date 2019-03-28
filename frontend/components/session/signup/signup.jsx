import React from 'react';
import * as UiUtil from '../../../util/ui_util';
import { merge } from 'lodash';

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
};

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = merge(initialState, { errors: props.errors });
        this.handleSubmit = this.handleSubmit.bind(this);
        this.revealModal = this.revealModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleLoginError = this.handleLoginError.bind(this);
    }

    componentDidMount() {
        this.setState({ errors: [] });
    }

    revealModal() {
        return (e) => this.setState({ modal: true });
    }

    hideModal() {
        return (e) => this.setState({ modal: false });
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
                if (type !== "gender") {
                    UiUtil.toggleErrorDisplay(element.parentElement, "hide");
                }
                UiUtil.removeSignupErrorClass(element);
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

        if (this.state.gender === "") {
            UiUtil.addSignupErrorClass(allInputs[4]);
            validSignup = false;
        }

        if (validSignup) {
            this.props.signup({ user })
                .then(
                    null,
                    () => this.handleLoginError(allInputs.slice(2, 4))
                );
        }
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
            errors
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
                    <button onClick={this.hideModal()}>Okay</button>
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

                <div>{errors}</div>

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
                    <label className="birthday">Birthday<br />
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
                        By clicking Sign Up, you agree to our &nbsp;
                        <strong>Terms</strong>,&nbsp;<strong>Data Policy</strong>
                        &nbsp; and <strong>Cookies Policy.</strong>&nbsp; You may receive
                        SMS Notifications from us and can opt out any time.
                    </p>

                    <div className="signup-buttons">
                        <input type="submit" value="Sign Up" />
                    </div>
                </form>

                {this.props.failedSignup ? null :
                    <button
                        onClick={this.props.demoLogin}
                        className="demo-button"
                    >Demo Login</button>}
            </section>
        );
    }
}

export default Signup;