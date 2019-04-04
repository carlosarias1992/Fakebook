class Comment < ApplicationRecord
    validates :author_id, :post_id, :content, presence: true
    belongs_to :post

    belongs_to :author,
        primary_key: :id, 
        foreign_key: :author_id, 
        class_name: :User

    has_many :likes, 
      primary_key: :id, 
      foreign_key: :likeable_id, 
      class_name: :Like,
      dependent: :destroy 
end 