import React from 'react';
import HeaderContainer from './header/header_container';
import PostsForm from './posts/posts_form';
import PeopleYouMayKnow from './people_you_may_know/people_you_may_know';

export default props => {
    const { currentUser } = props;

    return (
        <main className="feed">
            <HeaderContainer />
            {currentUser.first_name}, {currentUser.last_name}
            <PostsForm />
            <PeopleYouMayKnow />
        </main>
    );
}