import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <section className="signup">
            <h1>Sign Up</h1>
            <h3>It's free and always will be.</h3>

            <form className="signup-form">
                <input type="text" className="name-input" placeholder="First name" />
                <input type="text" className="name-input" placeholder="Last name" />
                <input type="text" placeholder="Mobile number or email" />
                <input type="password" placeholder="New password" />

                <label className="birthday">Birthday<br />
                    <select>
                        <option value="Month">Month</option>
                    </select>
                    <select>
                        <option value="23">23</option>
                    </select>
                    <select>
                        <option value="1994">1994</option>
                    </select>

                    <span className="why-birthday">
                        Why do I need to provide my birthday?
                    </span>
                </label>

                <div className="gender">
                    <input type="radio"/>Female
                    <input type="radio" />Male
                </div>

                <p className="fineprint">
                    By clicking Sign Up, you agree to our 
                    <Link to="/"> Terms</Link>, <Link to="/"> Data Policy</Link> and 
                    <Link to="/"> Cookies Policy.</Link> You may receive 
                    SMS Notifications from us and can opt out any time.
                </p>

                <input type="submit" value="Sign Up" />

                <footer class="signup-footer">
                    <hr />
                    <p>
                        <Link to="/">Create a Page </Link>
                        for a celebrity, band or business.
                    </p>
                </footer>
            </form>
        </section>
    );
};