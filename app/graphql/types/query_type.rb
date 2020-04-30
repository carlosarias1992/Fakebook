module Types
  class QueryType < Types::BaseObject
    field :users, [Types::UserType], null: false, description: "Returns a list of all users"
    field :user, Types::UserType, null: true do
      argument :id, ID, required: true
    end
    field :friend_requests, [Types::FriendRequestType], null: false do
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
  end
end
