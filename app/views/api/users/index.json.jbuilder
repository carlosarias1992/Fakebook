current_user_friends = current_user.friends
current_user_friend_ids = current_user_friends.map(&:id)
current_user_posts = current_user.posts.with_attached_photos
    .includes(:comments).includes(:likes)

json.users do 
    @users.each do |user|
        if current_user.suggestions.include?(user.id) 
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
        if (!current_user.suggestions.include?(friend.id)) 
            json.set! friend.id do 
                json.partial! 'api/users/user', user: friend
            end 
        end
    end
end

json.posts do
    current_user_posts.each do |post|
        json.set! post.id do
            json.partial! 'api/users/post', post: post
        end 
    end 
    
    current_user_friends.each do |friend|
        friend_posts = friend.posts.with_attached_photos
            .includes(:comments).includes(:likes)

        friend_posts.each do |post|
            json.set! post.id do
                json.partial! 'api/users/post', post: post
            end 
        end 
    end 
end 

json.comments do 
    current_user_posts.each do |post|
        json.partial! 'api/users/comments', post: post
    end 

    current_user_friends.each do |friend|
        friend_posts = friend.posts.with_attached_photos
            .includes(:comments).includes(:likes)

        friend_posts.each do |post| 
            json.partial! 'api/users/comments', post: post
        end 
    end 
end 

json.friendRequests do 
    current_user.friend_requests.each do |friend_request|
        json.set! friend_request.id do 
            json.extract! friend_request, :id, :sender_id, :receiver_id, :status, :seen
        end 
    end 
end 

json.likes do 
    current_user_posts.each do |post|
        json.partial! 'api/users/post_likes', post: post
        json.partial! 'api/users/comment_likes', post: post
    end 

    current_user_friends.each do |friend|
        friend_posts = friend.posts.with_attached_photos
            .includes(:comments).includes(:likes)

        friend_posts.each do |post|
            json.partial! 'api/users/post_likes', post: post
            json.partial! 'api/users/comment_likes', post: post
        end
    end 
end 
