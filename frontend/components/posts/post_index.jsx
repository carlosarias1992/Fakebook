import React from "react";
import PostIndexItemContainer from "./post_index_item_container";

export default (props) => {
  const { data, loading } = props;

  if (loading) return null;

  const posts = data.feedPosts || data.profilePosts;

  const allPosts = posts.map((post) => {
    return <PostIndexItemContainer post={post} key={post.id} />;
  });

  return <div className="allPosts">{allPosts}</div>;
};
