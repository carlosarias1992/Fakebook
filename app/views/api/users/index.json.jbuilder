current_user_friends = []
current_user_friends.concat(Array.new(current_user.sent_friend_requests.where(status: "accepted").pluck(:receiver_id)))
current_user_friends.concat(Array.new(current_user.received_friend_requests.where(status: "accepted").pluck(:sender_id)))

rejections = current_user.rejections.map { |rejection| rejection.rejected_id }
suggestions = []
tries = 0

until suggestions.length === 7 || tries > 15
    user_id = User.all.pluck(:id).sample

    unless (user_id == nil || suggestions.include?(user_id) || current_user.id === user_id || rejections.include?(user_id) || current_user_friends.include?(user_id)) 
        suggestions << user_id
    end 

    tries += 1
end 

json.users do 
    @users.each do |user|
        if (current_user_friends.include?(user.id) || !suggestions.include?(user.id)) 
            json.set! user.id do 
                json.extract! user, :id, :first_name, :last_name, :gender, :birth_date

                if user.avatar.attached? 
                    json.avatar url_for(user.avatar);
                else 
                    json.avatar nil
                end 

                if user.cover.attached? 
                    json.cover url_for(user.cover);
                else 
                    json.cover nil
                end 

                attachments = []
                user.posts.each do |post|
                    attachments.concat(post.photos.map { |photo| url_for(photo) })
                end 

                json.photos attachments.reverse

                json.post_likes_id user.likes.where(likeable_type: "post").pluck(:id)
                json.comment_likes_id user.likes.where(likeable_type: "comment").pluck(:id)

                friends = []
                friends.concat(Array.new(user.sent_friend_requests.where(status: "accepted").pluck(:receiver_id)))
                friends.concat(Array.new(user.received_friend_requests.where(status: "accepted").pluck(:sender_id)))
                json.friends_id friends.sort

                json.posts_id user.posts.pluck(:id)

                if current_user.id == user.id 
                    json.suggestion_ids suggestions
                end
            end 
        elsif suggestions.include?(user.id) 
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
end

json.posts do
    current_user.posts.each do |post|
        json.set! post.id do
            json.extract! post, :id, :content, :author_id, :created_at, :receiver_id, :life_event, :event_category, :event_date

            if post.created_at == post.updated_at
                json.updated false
            else
                json.updated true
            end 

            json.comments_id post.comments.pluck(:id).sort
            json.likes_id post.likes.pluck(:id)

            if post.photos.attached? 
                json.photos post.photos.map { |photo| url_for(photo) }
            else 
                json.photos []
            end 
        end 
    end 
    
    current_user_friends.each do |friend_id|
        friend = @users.find_by(id: friend_id)
        
        friend.posts.each do |post|
            json.set! post.id do
                json.extract! post, :id, :content, :author_id, :created_at, :receiver_id, :life_event, :event_category, :event_date

                if post.created_at == post.updated_at
                    json.updated false
                else
                    json.updated true
                end 

                json.comments_id post.comments.pluck(:id).sort
                json.likes_id post.likes.pluck(:id)

                if post.photos.attached? 
                    json.photos post.photos.map { |photo| url_for(photo) }
                else 
                    json.photos []
                end 
            end 
        end 
    end 
end 

json.comments do 
    current_user.posts.each do |post|
        post.comments.each do |comment|
            json.set! comment.id do 
                json.extract! comment, :id, :author_id, :post_id, :content, :created_at
                json.likes_id comment.likes.pluck(:id)
            end 
        end 
    end 

    current_user_friends.each do |friend_id|
        friend = @users.find_by(id: friend_id)

        friend.posts.each do |post| 
            post.comments.each do |comment|
                json.set! comment.id do 
                    json.extract! comment, :id, :author_id, :post_id, :content, :created_at
                    json.likes_id comment.likes.pluck(:id)
                end 
            end 
        end 
    end 
end 

json.friendRequests do 
    current_user.sent_friend_requests.each do |friend_request|
        json.set! friend_request.id do 
            json.extract! friend_request, :id, :sender_id, :receiver_id, :status, :seen
        end 
    end 

    current_user.received_friend_requests.each do |friend_request|
        json.set! friend_request.id do 
            json.extract! friend_request, :id, :sender_id, :receiver_id, :status, :seen
        end 
    end 
end 

json.likes do 
    current_user.posts.each do |post|
        post.likes.each do |like|
            json.set! like.id do 
                json.extract! like, :id, :user_id, :likeable_id, :likeable_type
            end 
        end 

        post.comments.each do |comment|
            comment.likes.each do |like|
                json.set! like.id do 
                    json.extract! like, :id, :user_id, :likeable_id, :likeable_type
                end 
            end 
        end 
    end 

    current_user_friends.each do |friend_id|
        friend = @users.find_by(id: friend_id)

        friend.posts.each do |post|
            post.likes.each do |like|
                json.set! like.id do 
                    json.extract! like, :id, :user_id, :likeable_id, :likeable_type
                end 
            end 

            post.comments.each do |comment|
                comment.likes.each do |like|
                    json.set! like.id do 
                        json.extract! like, :id, :user_id, :likeable_id, :likeable_type
                    end 
                end 
            end 
        end
    end 
end 
