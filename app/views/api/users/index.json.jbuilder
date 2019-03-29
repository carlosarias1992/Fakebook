@users.each do |user|
    json.set! user.id do 
        json.extract! user, :id, :first_name, :last_name, :gender

        if user.avatar.attached? 
            json.avatar url_for(user.avatar);
        else 
            json.avatar nil
        end 
    end 
end