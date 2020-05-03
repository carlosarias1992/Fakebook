import React from "react";
import { toggleClass } from "../../util/ui_util";
import { Mutation } from "react-apollo";
import { DeletePostMutationDefinition } from "../../graphql/definitions/mutations";

const Options = (props) => {
  const { post, currentUser, hideDropdown, showModal } = props;

  return (
    <>
      {(parseInt(post.author.id) === parseInt(currentUser.id) ||
        (post.receiver &&
          parseInt(post.receiver.id) === parseInt(currentUser.id))) && (
        <>
          <button
            className="post-menu-button"
            onClick={toggleClass(`.post-${post.id}`, "hide")}
            onBlur={hideDropdown}
          >
            <i className="post-menu-icon" />
          </button>

          <ul className={"dropdown post-" + post.id + " hide"}>
            {parseInt(post.author.id) === parseInt(currentUser.id) && (
              <li onMouseDown={showModal}>Edit Post</li>
            )}
            <Mutation
              mutation={DeletePostMutationDefinition}
              refetchQueries={["FeedPostsQuery", "ProfilePostsQuery"]}
            >
              {(deletePost) => (
                <li
                  onMouseDown={() => deletePost({ variables: { id: post.id } })}
                >
                  Delete
                </li>
              )}
            </Mutation>
          </ul>
        </>
      )}
    </>
  );
};

export default Options;
