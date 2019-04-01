import React from 'react';
import HeaderContainer from '../feed/header/header_container';
import CoverContainer from './cover/cover_container';
import ProfilePostsIndexContainer from './profile_posts_index_container';
import PostsFormContainer from '../posts/posts_form_container';
import Copyright from '../copyright';

class Profile extends React.Component {
    componentWillMount() {
        this.props.fetchUsers();
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        const { user } = this.props;

        return (
            <main>
                <header className="flex-center">
                    <HeaderContainer />
                </header>
                <CoverContainer user={user}/>
                <section className="profile-body flex-center">
                    <aside>
                        <div className="profile-box">
                            <div className="profile-box-header">
                                <i className="photos-box-icon"></i>
                                Photos
                            </div>
                        </div>
                        <div className="profile-box">
                            <div className="profile-box-header">
                                <i className="friends-box-icon"></i>
                                Friends
                            </div>
                        </div>
                        <Copyright />
                    </aside>
                    <div className="center-col">
                        <PostsFormContainer receiver={user}/>
                        <ProfilePostsIndexContainer user={user}/>
                    </div>
                </section>
            </main>
        )
    }
}

export default Profile;