friend_requests = FriendRequest.includes(:sender).includes(:receiver)
    .where("(sender_id = #{current_user.id} OR receiver_id = #{current_user.id}) AND status = 'accepted'")

sent_friend_requests = FriendRequest.includes(:receiver)
    .where("sender_id = #{current_user.id} AND status = 'pending'").pluck(:receiver_id)

current_user_friend_requests = friend_requests.select do |request|
    request.sender_id == current_user.id || request.receiver_id == current_user.id
end 

current_user_friends = current_user_friend_requests.map do |request|
    if request.sender_id == current_user.id 
        request.receiver
    else
        request.sender
    end 
end 

current_user_friend_ids = current_user_friends.map(&:id)

found_suggestion = false
tries = 0

@current_suggestions = @current_suggestions.map do |suggestion|
    suggestion.to_i
end 

rejections = current_user.rejections.map { |rejection| rejection.rejected_id }
users = User.all.pluck(:id)

until found_suggestion
    user_id = users.sample
    
    unless (user_id == nil || current_user_friend_ids.include?(user_id) || 
        @current_suggestions.include?(user_id) || current_user.id === user_id || 
        tries > 25 || rejections.include?(user_id) || sent_friend_requests.include?(user_id)) 
        found_suggestion = true
    end 

    tries += 1
end 

json.array! [user_id]