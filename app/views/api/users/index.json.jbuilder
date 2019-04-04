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
    end 
end