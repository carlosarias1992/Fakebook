import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: '' };
        this.logout = this.logout.bind(this);
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

    logout() {
        this.props.logout();
        this.props.history.push("/");
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
                            <input type="submit" name="" />
                        </form>
                    </div>
                    <div>
                        {currentUser.first_name}, {currentUser.last_name}
                        <button onClick={this.logout}>Log out</button>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
