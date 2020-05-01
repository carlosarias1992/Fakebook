module Types
  class CommentType < Types::BaseObject
    field :id, ID, null: false
    field :post_id, ID, null: false
    field :content, String, null: false
    field :author, Types::UserType, null: false
    field :likes, [Types::LikeType], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
