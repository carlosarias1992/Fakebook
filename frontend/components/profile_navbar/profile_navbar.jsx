import React from "react";
import { Link } from "react-router-dom";
import AvatarContainer from "../avatar/avatar_container";
import { addClass, removeClass } from "../../util/ui_util";
import FriendRequests from "../friendRequest/FriendRequestsContainer";

class ProfileNavbar extends React.Component {
  render() {
    const { currentUser, logout, showTimeline } = this.props;

    return (
      <section className="profile-navbar">
        <ul className="main-navbar">
          <li>
            <AvatarContainer
              message={currentUser.first_name}
              className="avatar-link"
            />
          </li>
          <li>
            <Link to="/feed" onClick={showTimeline}>
              Home
            </Link>
          </li>
          <li>
            <ul className="notifications-menu">
              <FriendRequests />
            </ul>
          </li>
          <button
            onClick={() => {
              document.querySelector(".dropdown").classList.toggle("hide");
              document
                .querySelector(".menu-icon")
                .classList.toggle("white-menu-icon");
            }}
            onBlur={() => {
              const dropdownElement = document.querySelector(".dropdown");
              const menuIcon = document.querySelector(".menu-icon");
              addClass(dropdownElement, "hide");
              removeClass(menuIcon, "white-menu-icon");
            }}
          >
            <li className="menu-button">
              <i className="menu-icon" />
            </li>
          </button>
          <ul className="dropdown hide">
            <li onMouseDown={logout}>Log Out</li>
          </ul>
        </ul>
      </section>
    );
  }
}

export default ProfileNavbar;
