import React from 'react';
import Header from './header/header';
import PostsForm from './posts/posts_form';
import PeopleYouMayKnow from './people_you_may_know/people_you_may_know';

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
        const { currentUser } = this.props;

        return (
            <main className="feed">
                <Header />
                {currentUser.first_name}, {currentUser.last_name}
                <button onClick={this.logout}>Log out</button>
                <PostsForm />
                <PeopleYouMayKnow />
            </main>
        );
    }
}

export default Feed;