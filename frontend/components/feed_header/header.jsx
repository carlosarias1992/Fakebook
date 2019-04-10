import React from 'react';
import ProfileNavbarContainer from '../profile_navbar/profile_navbar_container';
import { Link } from 'react-router-dom';
import SearchContainer from '../search/search_container';

class Header extends React.Component {
    render() {
        return (
            <header className="flex-center">
                <div className="large-container flex-space-between">
                    <div className="search-bar">
                        <Link to="/">
                            <span className="white-logo-icon"></span>
                        </Link>
                        <SearchContainer />
                    </div>
                    <ProfileNavbarContainer />
                </div>
            </header>
        );
    }
}

export default Header;
