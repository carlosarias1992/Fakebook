all_posts = Post.with_attached_photos.includes(:comments).includes(:likes).all
all_comments = Comment.includes(:likes).all
all_likes = Like.all 
all_friend_requests = FriendRequest.includes(:sender).includes(:receiver).all

current_user_friend_requests = all_friend_requests.select do |request|
    (request.sender_id == current_user.id || request.receiver_id == current_user.id) &&
    request.status == "accepted"
end 

current_user_friends = current_user_friend_requests.map do |request|
    if request.sender_id == current_user.id 
        request.receiver
    else
        request.sender
    end 
end 

current_user_friend_ids = current_user_friends.map(&:id)

json.users do 
    @users.each do |user|
        if current_user.suggestions(@users, all_friend_requests).include?(user.id) 
            json.set! user.id do 
                json.extract! user, :id, :first_name, :last_name, :gender

                if user.avatar.attached? 
                    json.avatar url_for(user.avatar);
                else 
                    json.avatar nil
                end 
            end
        else
            json.set! user.id do 
                json.extract! user, :id, :first_name, :last_name
            end
        end 
    end

    current_user_friends.each do |friend|
        if (!current_user.suggestions(@users, all_friend_requests).include?(friend.id)) 
            json.set! friend.id do 
                json.partial! 'api/users/user', { user: friend, likes: all_likes, 
                    posts: all_posts, requests: all_friend_requests, users: @users }
            end 
        end
    end
end

current_user_posts = all_posts.select do |post|
    post.author_id == current_user.id
end 

current_user_post_ids = current_user_posts.map(&:id)

current_user_friend_posts = all_posts.select do |post|
    current_user_friend_ids.include?(post.author_id)
end 

current_user_friend_post_ids = current_user_friend_posts.map(&:id)

json.posts do
    current_user_posts.each do |post|
        json.set! post.id do
            json.partial! 'api/users/post', post: post
        end 
    end 
    
    current_user_friend_posts.each do |post|
        json.set! post.id do
            json.partial! 'api/users/post', post: post
        end 
    end 
end 

current_user_comments = all_comments.select do |comment|
    current_user_post_ids.include?(comment.post_id)
end 

current_user_comment_ids = current_user_comments.map(&:id)

current_user_friend_comments = all_comments.select do |comment|
    current_user_friend_post_ids.include?(comment.post_id)
end 

current_user_friend_comment_ids = current_user_friend_comments.map(&:id)

json.comments do 
    current_user_comments.each do |comment|
        json.partial! 'api/users/comments', comment: comment
    end 

    current_user_friend_comments.each do |comment| 
        json.partial! 'api/users/comments', comment: comment
    end 
end 

current_user_friend_requests = all_friend_requests.select do |request|
    request.sender_id == current_user.id || request.receiver_id == current_user.id
end 

json.friendRequests do 
    current_user_friend_requests.each do |friend_request|
        json.set! friend_request.id do 
            json.extract! friend_request, :id, :sender_id, :receiver_id, :status, :seen
        end 
    end 
end 

current_user_post_likes = all_likes.select do |like|
    like.likeable_type === "post" && current_user_post_ids.include?(like.likeable_id)
end 

current_user_comment_likes = all_likes.select do |like|
    like.likeable_type === "comment" && current_user_comment_ids.include?(like.likeable_id)
end 

current_user_friend_post_likes = all_likes.select do |like|
    like.likeable_type === "post" && current_user_friend_post_ids.include?(like.likeable_id)
end

current_user_friend_comment_likes = all_likes.select do |like|
    like.likeable_type === "comment" && current_user_friend_comment_ids.include?(like.likeable_id)
end 

json.likes do 
    current_user_post_likes.each do |post_like|
        json.partial! 'api/users/post_likes', post_like: post_like
    end 

    current_user_comment_likes.each do |comment_like|
        json.partial! 'api/users/comment_likes', comment_like: comment_like
    end

    current_user_friend_post_likes.each do |post_like|
        json.partial! 'api/users/post_likes', post_like: post_like
    end 

    current_user_friend_comment_likes.each do |comment_like|
        json.partial! 'api/users/comment_likes', comment_like: comment_like
    end
end 
