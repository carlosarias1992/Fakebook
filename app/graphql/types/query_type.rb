module Types
  class QueryType < Types::BaseObject
    field :users, [Types::UserType], null: false, description: "Returns a list of all users"
    field :user, Types::UserType, null: true do
      argument :id, ID, required: true
    end
    field :friend_requests, [Types::FriendRequestType], null: false do
      argument :user_id, ID, required: true
    end
    field :feed_posts, [Types::PostType], null: false do
      argument :user_id, ID, required: true
    end
    field :profile_posts, [Types::PostType], null: false do
      argument :user_id, ID, required: true
    end

    def users
      User.all
    end

    def user(id:)
      User.find(id)
    end

    def friend_requests(user_id:)
      FriendRequest.where("sender_id=#{user_id} or receiver_id=#{user_id}")
    end

    def feed_posts(user_id:)
      user = User.find(user_id)
      visible_ids = [user_id, *user.friends.map(&:id)]
      visible_posts = Post.where("(author_id in (#{visible_ids.join(',')}) or receiver_id in (#{visible_ids.join(',')})) and life_event != true")
      visible_posts.order(updated_at: :desc)
    end

    def profile_posts(user_id:)
      user = User.find(user_id)
      visible_ids = [user_id, *user.friends.map(&:id)]
      visible_posts = Post.where("(author_id in (#{visible_ids.join(',')}) or receiver_id in (#{visible_ids.join(',')})) and (life_event != true or (life_event = true and author_id = #{user_id}))")
      visible_posts.order(updated_at: :desc)
    end
  end
end
