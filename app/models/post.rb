class Post < ApplicationRecord
    belongs_to :author, foreign_key: :author_id, class_name: :User
    has_many :comments, dependent: :destroy
    has_many_attached :photos

    has_many :likes,
      primary_key: :id, 
      foreign_key: :likeable_id, 
      class_name: :Like,
      dependent: :destroy

    has_one :receiver,
        primary_key: :receiver_id,
        foreign_key: :id,
        class_name: :User
end 