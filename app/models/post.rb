class Post < ApplicationRecord
    belongs_to :user, foreign_key: :author_id, class_name: :User
    has_many :comments, dependent: :destroy
end 