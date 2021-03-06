# frozen_string_literal: true

class User < ApplicationRecord
  validates :username, :session_token, :password_digest, presence: true
  validates :birth_date, :gender, :first_name, :last_name, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  has_one_attached :avatar
  has_one_attached :cover
  has_many :posts, foreign_key: :author_id, class_name: :Post, dependent: :destroy

  has_many :sent_friend_requests,
           primary_key: :id,
           foreign_key: :sender_id,
           class_name: :FriendRequest,
           dependent: :destroy

  has_many :received_friend_requests,
           primary_key: :id,
           foreign_key: :receiver_id,
           class_name: :FriendRequest,
           dependent: :destroy

  has_many :comments,
           primary_key: :id,
           foreign_key: :author_id,
           class_name: :Comment,
           dependent: :destroy

  has_many :likes,
           primary_key: :id,
           foreign_key: :user_id,
           class_name: :Like,
           dependent: :destroy

  has_many :rejections,
           primary_key: :id,
           foreign_key: :rejector_id,
           class_name: :Rejection,
           dependent: :destroy

  after_initialize :ensure_session_token

  def friends
    accepted_friend_requests = FriendRequest
                               .where("(sender_id=#{id} or receiver_id=#{id}) and status='accepted'")
                               .preload(:sender, :receiver)

    accepted_friend_requests.map do |friend_request|
      if friend_request.receiver == self
        friend_request.sender
      else
        friend_request.receiver
      end
    end
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user&.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    bcrypt_password = BCrypt::Password.new(password_digest)
    bcrypt_password.is_password?(password)
  end

  def reset_session_token
    self.session_token = User.generate_session_token
    save
    session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  private

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end
end
