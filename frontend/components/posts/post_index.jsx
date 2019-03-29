import React from 'react';
import PostIndexItemContainer from './post_index_item_container';

export default props => {
    const allPosts = Object.values(props.posts).map((post) => {
        return <PostIndexItemContainer post={post} key={post.id} />;
    });

    return (
        <div>{allPosts}</div>
    )
}