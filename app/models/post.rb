class Post < ApplicationRecord
    belongs_to :user, foreign_key: :author_id, class_name: :User
    has_many :comments, dependent: :destroy

    has_many :likes, 
      primary_key: :id, 
      foreign_key: :likeable_id, 
      class_name: :Like,
      dependent: :destroy
end 