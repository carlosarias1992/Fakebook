module Types
  class FriendRequestType < Types::BaseObject
    field :id, ID, null: false
    field :sender_id, ID, null: false
    field :receiver_id, ID, null: false
    field :status, String, null: false
    field :seen, Boolean, null: false
  end
end