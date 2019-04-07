json.extract! @user, :id, :username, :first_name, :last_name, :birth_date

if @user.avatar.attached? 
    json.avatar url_for(@user.avatar)
else 
    json.avatar nil
end 

if @user.cover.attached? 
    json.cover url_for(@user.cover)
else 
    json.cover nil
end 

attachments = []
@user.posts.each do |post|
    attachments.concat(post.photos.map { |photo| url_for(photo) })
end 

json.photos attachments

json.post_likes_id @user.likes.where(likeable_type: "post").pluck(:id)
json.comment_likes_id @user.likes.where(likeable_type: "comment").pluck(:id)