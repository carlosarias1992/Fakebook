# frozen_string_literal: true

module Types
  class PostType < Types::BaseObject
    include Rails.application.routes.url_helpers

    field :id, ID, null: false
    field :content, String, null: false
    field :life_event, Boolean, null: true
    field :event_date, GraphQL::Types::ISO8601DateTime, null: true
    field :event_category, String, null: true
    field :author, Types::UserType, null: false
    field :receiver, Types::UserType, null: true
    field :comments, [Types::CommentType], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :photos, [Types::File], null: false
    field :likes, [Types::LikeType], null: false

    def photos
      if object.photos.attached?
        object.photos.map { |photo| rails_blob_path(photo, only_path: true) }
      else
        []
      end
    end
  end
end
