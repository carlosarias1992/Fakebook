friend_requests = FriendRequest.includes(:sender).includes(:receiver)
        .where("(sender_id = #{current_user.id} OR receiver_id = #{current_user.id}) AND status = 'accepted'")

current_user_friend_requests = friend_requests.select do |request|
    (request.sender_id == self.id || request.receiver_id == self.id) &&
    request.status == "accepted"
end 

current_user_friends = current_user_friend_requests.map do |request|
    if request.sender_id == self.id 
        request.receiver
    else
        request.sender
    end 
end 

found_suggestion = false
tries = 0

@current_suggestions = @current_suggestions.map do |suggestion|
    suggestion.to_i
end 

rejections = current_user.rejections.map { |rejection| rejection.rejected_id }

until found_suggestion
    user_id = User.all.pluck(:id).sample
    
    unless (user_id == nil || current_user_friends.include?(user_id) || 
        @current_suggestions.include?(user_id) || current_user.id === user_id || 
        tries > 25 || rejections.include?(user_id)) 
        found_suggestion = true
    end 

    tries += 1
end 

json.array! [user_id]