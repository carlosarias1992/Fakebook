module Types
  class LikeType < Types::BaseObject
    field :id, ID, null: false
    field :likeable_type, String, null: false
    field :likeable_id, ID, null: false
    field :liker, Types::UserType, null: false
  end
end
