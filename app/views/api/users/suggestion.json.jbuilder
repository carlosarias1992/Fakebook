found_suggestion = false
tries = 0

@current_suggestions = @current_suggestions.map do |suggestion|
    suggestion.to_i
end 

rejections = current_user.rejections.map { |rejection| rejection.rejected_id }

until found_suggestion
    user_id = User.all.pluck(:id).sample
    
    unless (user_id == nil || @current_suggestions.include?(user_id) || current_user.id === user_id || tries > 10 || rejections.include?(user_id)) 
        @current_suggestions << user_id
        found_suggestion = true
    end 

    tries += 1
end 

json.array! @current_suggestions