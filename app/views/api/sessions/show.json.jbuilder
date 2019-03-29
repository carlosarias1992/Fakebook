json.extract! @user, :id, :username, :first_name, :last_name, :gender

if @user.avatar.attached? 
    json.avatar url_for(@user.avatar);
else 
    json.avatar nil
end 