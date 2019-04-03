import React from 'react';
import { Link } from 'react-router-dom';
import AvatarContainer from './avatar_container';
import { toggleClass, addClass } from '../util/ui_util';
import FriendRequestIndexContainer from './profile/friend_request/friend_request_index_container';

class ProfileNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = { dropdownElement: '' };
    }

    componentDidMount() {
        const dropdownElement = document.querySelector(".dropdown");
        this.setState({ dropdownElement });
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
                        <AvatarContainer message={currentUser.first_name} className="avatar-link"/>
                    </li>
                    <li><Link to="/feed">Home</Link></li>
                    <li>
                        <ul className="notifications-menu">
                            <FriendRequestIndexContainer />
                            <li className="notifications-button">
                                <i className="notifications-icon"></i>
                            </li>
                        </ul>
                    </li>
                    <button
                        onClick={toggleClass(".dropdown", "hide")}
                        onBlur={() => addClass(this.state.dropdownElement, "hide")}
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