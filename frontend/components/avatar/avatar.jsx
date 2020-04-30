import React from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const QueryDefinition = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      id
      gender
      avatarUrl
    }
  }
`;

const renderAvatar = (props) => {
  if (props.loading) return null;

  const {
    data: { user },
    avatarClass,
    sessionDataReceived,
    message,
  } = props;
  let avatar;

  if (user.avatarUrl) {
    avatar = user.avatarUrl;
  } else {
    avatar = user.gender === "F" ? window.femaleAvatar : window.maleAvatar;
  }

  if (sessionDataReceived) {
    return (
      <Link to={"/users/" + user.id} className={avatarClass}>
        <img src={avatar} alt="Profile picture" className="avatar" />
        {message}
      </Link>
    );
  } else {
    return (
      <Link to={"/users/" + user.id} className={avatarClass}>
        <img src={window.loadingImage} alt="Loading" className="avatar" />
        {message}
      </Link>
    );
  }
};

const Avatar = (props) => {
  if (!props.userId) return null;

  const vars = { id: props.userId };

  return (
    <Query query={QueryDefinition} variables={vars}>
      {({ data, loading }) => renderAvatar({ data, loading, ...props })}
    </Query>
  );
};

export default Avatar;
