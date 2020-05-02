import React from "react";
import Post from "./PostContainer";

export default (props) => {
  const { data, loading } = props;

  if (loading) return null;

  const posts = data.feedPosts || data.profilePosts;

  const allPosts = posts.map((post) => {
    return <Post post={post} key={post.id} />;
  });

  return <div className="allPosts">{allPosts}</div>;
};
