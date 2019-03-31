import React from 'react';
import { Link } from 'react-router-dom';
import AvatarContainer from './avatar_container';
import { toggleClass } from '../util/ui_util';

class ProfileNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.logout();
        this.props.history.push("/");
    }

    render() {
        const { currentUser } = this.props;

        return (
            <section className="profile-navbar">
                <ul className="main-navbar">
                    <li>
                        <Link to="/" className="avatar-link">
                            <AvatarContainer />{currentUser.first_name}
                        </Link>
                    </li>
                    <li><Link to="/feed">Home</Link></li>
                    <li>
                        <ul className="notifications-menu">
                            <li className="notifications-button">
                                <i className="friend-requests-icon"></i>
                            </li>
                            <li className="notifications-button">
                                <i className="notifications-icon"></i>
                            </li>
                        </ul>
                    </li>
                    <button
                        onFocus={toggleClass(".dropdown", "hide")}
                        onBlur={toggleClass(".dropdown", "hide")}
                    >
                        <li className="menu-button">
                            <i className="menu-icon"></i>
                        </li>
                    </button>
                    <ul className="dropdown hide">
                        <li onMouseDown={this.logout}>Log Out</li>
                    </ul>
                </ul>
            </section>
        );
    }
}

export default ProfileNavbar;