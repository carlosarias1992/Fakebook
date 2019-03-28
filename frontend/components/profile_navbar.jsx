import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './avatar';

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
                            <Avatar />{currentUser.first_name}
                        </Link>
                    </li>
                    <li><Link to="/feed">Home</Link></li>
                    <li className="notifications-button">
                        <i className="notifications-icon"></i>
                    </li>
                    <li className="menu-button">
                        <i className="menu-icon"></i>
                    </li>
                </ul>
                
                <ul className="dropdown hide">
                    <li onClick={this.logout}>Log Out</li>
                </ul>
            </section>
        );
    }
}

export default ProfileNavbar;