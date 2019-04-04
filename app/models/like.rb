class Like < ApplicationRecord 
  validates :user_id, :likeable_type, :likeable_id, presence: true 
  belongs_to :user 

  belongs_to :user, 
    primary_key: :id, 
    foreign_key: :user_id, 
    class_name: :User
end 