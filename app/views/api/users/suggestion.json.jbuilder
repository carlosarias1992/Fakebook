current_user_friends = []
current_user_friends.concat(Array.new(current_user.sent_friend_requests.where(status: "accepted").pluck(:receiver_id)))
current_user_friends.concat(Array.new(current_user.received_friend_requests.where(status: "accepted").pluck(:sender_id)))

found_suggestion = false
tries = 0

@current_suggestions = @current_suggestions.map do |suggestion|
    suggestion.to_i
end 

rejections = current_user.rejections.map { |rejection| rejection.rejected_id }

until found_suggestion
    user_id = User.all.pluck(:id).sample
    
    unless (user_id == nil || current_user_friends.include?(user_id) || @current_suggestions.include?(user_id) || current_user.id === user_id || tries > 10 || rejections.include?(user_id)) 
        found_suggestion = true
    end 

    tries += 1
end 

json.array! [user_id]