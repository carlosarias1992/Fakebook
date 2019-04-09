import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <footer className="flex-center main-footer">
            <section className="container">
                <section className="top-footer">
                    <span>English (US)</span>
                </section>
                <hr />
                <span className="copyright">
                    Fakebook by Carlos Arias-Miranda 2019. Inspired by
                    Facebook. Connect with me on
                        <a className="social-media" target="_blank" href="https://www.linkedin.com/in/carlos-arias-miranda-a98025172/">LinkedIn</a> or
                        <a className="social-media" target="_blank" href="https://github.com/carlosarias1992">Github</a>.
                    </span>
            </section>
        </footer>
    )
};