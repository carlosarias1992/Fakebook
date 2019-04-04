class Comment < ApplicationRecord
    validates :author_id, :post_id, :content, presence: true

    belongs_to :author,
        primary_key: :id, 
        foreign_key: :author_id, 
        class_name: :User

    belongs_to :post
end 