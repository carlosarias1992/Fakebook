import React from 'react';
import { Redirect } from 'react-router-dom';

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.logout();
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                You are logged in
                <button onClick={this.logout}>Log out</button>
            </div>
        );
    }
}

export default Feed;