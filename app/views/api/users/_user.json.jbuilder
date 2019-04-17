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
user_posts = user.posts.with_attached_photos
    .includes(:comments).includes(:likes)
user_posts.each do |post|
    attachments.concat(post.photos.map { |photo| url_for(photo) })
end 

json.photos attachments.reverse

json.post_likes_id user.likes.where(likeable_type: "post").pluck(:id)
json.comment_likes_id user.likes.where(likeable_type: "comment").pluck(:id)

json.friends_id user.friends.map(&:id).sort

json.posts_id user_posts.pluck(:id)

if current_user.id == user.id 
    json.suggestion_ids user.suggestions
end

