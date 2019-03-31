import React from 'react';
import HeaderContainer from '../feed/header/header_container';
import CoverContainer from './cover/cover_container';
import ProfilePostsIndexContainer from './profile_posts_index_container';
import PostsFormContainer from '../posts/posts_form_container';
import Copyright from '../copyright';

class Profile extends React.Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <main>
                <header className="flex-center">
                    <HeaderContainer />
                </header>
                <CoverContainer />
                <section className="profile-body flex-center">
                    <aside>
                        <Copyright />
                    </aside>
                    <div className="center-col">
                        <PostsFormContainer />
                        <ProfilePostsIndexContainer />
                    </div>
                </section>
            </main>
        )
    }
}

export default Profile;