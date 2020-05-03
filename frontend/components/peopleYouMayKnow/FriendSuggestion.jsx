import React from "react";
import AvatarContainer from "../avatar/avatar_container";
import { Link } from "react-router-dom";
import FriendRequestActionButton from "../friendRequest/FriendRequestActionButtonContainer";
import { RejectFriendSuggestionMutationDefinition } from "../../graphql/definitions/mutations";
import { Mutation } from "react-apollo";

class FriendSuggestion extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div className="suggestion-item">
        <AvatarContainer userId={user.id} />
        <div>
          <Link to={"/users/" + user.id}>
            {user.firstName} {user.lastName}
          </Link>
          <div className="suggestion-buttons">
            <FriendRequestActionButton user={user} />
            <Mutation
              mutation={RejectFriendSuggestionMutationDefinition}
              refetchQueries={["FriendRequestsQuery", "FriendSuggestionsQuery"]}
            >
              {(rejectFriendSuggestionMutationDefinition) => (
                <button
                  onClick={() => {
                    rejectFriendSuggestionMutationDefinition({
                      variables: { rejectedId: user.id },
                    });
                  }}
                >
                  Remove
                </button>
              )}
            </Mutation>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendSuggestion;
