import React from "react";
import HeaderContainer from "../feed_header/header_container";
import CoverContainer from "../cover/cover_container";
import ProfilePostsIndexContainer from "./profile_posts_index_container";
import CreatePostForm from "../posts/CreatePostFormContainer";
import FriendsIndexContainer from "../friends/friends_index_container";
import PhotosContainer from "../photos/photos_container";
import Copyright from "../copyright";
import ProfileFriendIndex from "../profile_friends/profile_friend_index";
import ProfilePhotosIndex from "../profile_photos/profile_photos_index";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userDataRetrieved: false };
  }

  componentDidMount() {
    const { sessionDataReceived, fetchSessionData } = this.props;

    if (!sessionDataReceived) {
      fetchSessionData();
    }

    scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    const { userDataRetrieved } = this.state;
    const {
      user,
      currentUser,
      fetchUser,
      showTimeline,
      profileTab,
    } = this.props;

    if (user.id !== currentUser.id && !userDataRetrieved) {
      fetchUser(user.id);
      this.setState({ userDataRetrieved: true });
    }

    if (prevProps.user.id !== user.id && profileTab !== "timeline") {
      showTimeline();
    }
  }

  render() {
    const {
      user,
      friendsBoolean,
      currentUser,
      friends,
      profileTab,
      showFriends,
      showPhotos,
      sendFriendRequest,
      friendRequest,
    } = this.props;
    const numberOfFriends = Object.values(friends).length;

    const gender = user.gender === "F" ? "she" : "he";
    const genderPossession = user.gender === "F" ? "her " : "him ";

    return (
      <main>
        <header className="flex-center">
          <HeaderContainer />
        </header>
        <CoverContainer user={user} />
        <section className="profile-body flex-center">
          {profileTab === "timeline" ? (
            <>
              <aside>
                <div className="profile-box">
                  <div className="profile-box-header">
                    <i className="photos-box-icon"></i>
                    <p onClick={showPhotos}>Photos</p>
                  </div>
                  <PhotosContainer user={user} />
                </div>
                <div className="profile-box">
                  <div className="profile-box-header">
                    <i className="friends-box-icon"></i>
                    <p onClick={showFriends}>Friends</p> &nbsp;
                    {numberOfFriends > 0 ? (
                      <>
                        · <span>{numberOfFriends}</span>
                      </>
                    ) : null}
                  </div>
                  <FriendsIndexContainer user={user} friends={friends} />
                </div>
                <Copyright />
              </aside>
              <div className="center-col">
                {friendsBoolean || user.id === currentUser.id ? (
                  <>
                    <CreatePostForm receiver={user} />
                    <ProfilePostsIndexContainer user={user} />
                  </>
                ) : (
                  <div className="not-friends">
                    <div className="not-friends-header">
                      DO YOU KNOW {`${user.first_name}`.toUpperCase()}?
                    </div>
                    {friendRequest.status === "pending" ? (
                      <p className="request-sent">Request sent.</p>
                    ) : (
                      <p>
                        To see what {gender} shares with friends,
                        <button onClick={() => sendFriendRequest(user.id)}>
                          send {genderPossession}a friend request.
                        </button>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : null}
          {profileTab === "friends" ? (
            <ProfileFriendIndex friends={friends} />
          ) : null}
          {profileTab === "photos" ? (
            <ProfilePhotosIndex photos={user.photos} />
          ) : null}
        </section>
      </main>
    );
  }
}

export default Profile;
