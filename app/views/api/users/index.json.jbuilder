@users.each do |user|
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
        friends.concat(user.sent_friend_requests.where(status: "accepted").pluck(:receiver_id))
        friends.concat(user.received_friend_requests.where(status: "accepted").pluck(:sender_id))
        json.friends_id friends.sort

        
        rejections = current_user.rejections.map { |rejection| rejection.rejected_id }
        suggestions = []
        tries = 0

        until suggestions.length === 7 || tries > 15
            user_id = User.all.pluck(:id).sample

            unless (user_id == nil || suggestions.include?(user_id) || current_user.id === user_id || rejections.include?(user_id) || friends.include?(user_id)) 
                suggestions << user_id
            end 

            tries += 1
        end 

        json.posts_id user.posts.pluck(:id)
        json.suggestion_ids suggestions
    end 
end

