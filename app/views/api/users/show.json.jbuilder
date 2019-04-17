users = User.with_attached_cover.with_attached_avatar.includes(:posts)
    .includes(:comments).includes(:likes).includes(:rejections).all

all_friend_requests = FriendRequest.includes(:sender).includes(:receiver).all

json.partial! 'api/users/user', {
    user: @user,
    posts: Post.with_attached_photos.includes(:comments).includes(:likes)
        .where(author_id: current_user.id),
    requests: FriendRequest.includes(:sender).includes(:receiver).all,
    likes: Like.where("(likeable_type = 'post' AND user_id = #{current_user.id}) OR (likeable_type = 'comment' AND user_id = #{current_user.id})"),
    users: users,
    suggestions: @user.suggestions(users, all_friend_requests)
}