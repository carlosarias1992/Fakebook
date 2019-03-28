json.extract! user, :id, :username, :first_name, :last_name, :gender

if user.avatar.attached? 
    json.avatar user.avatar
else 
    json.avatar nil
end 