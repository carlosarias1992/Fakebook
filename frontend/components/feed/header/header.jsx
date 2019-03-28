import React from 'react';
import ProfileNavbarContainer from '../../profile_navbar_container';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    handleInput(type) {
        return e => {
            const element = e.target;
            this.setState({ [type]: element.value });
        };
    } 

    render() {
        return (
            <header className="flex-center">
                <div className="large-container flex-space-between">
                    <div className="search-bar">
                        <span className="white-logo-icon"></span>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                value={this.state.search}
                                placeholder="Search"
                                onChange={this.handleInput("search")}
                            />
                            <div className="submit-button">
                                <input type="submit" value="" className="search-icon center" />
                            </div>
                        </form>
                    </div>
                    <ProfileNavbarContainer />
                </div>
            </header>
        );
    }
}

export default Header;
