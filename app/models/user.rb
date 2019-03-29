class User < ApplicationRecord
    validates :username, :session_token, :password_digest, presence: true 
    validates :birth_date, :gender, :first_name, :last_name, presence: true 
    validates :username, :session_token, uniqueness: true 
    validates :password, length: { minimum: 6, allow_nil: true }

    attr_reader :password 

    has_one_attached :avatar

    has_many :posts, foreign_key: :author_id, class_name: :Post, dependent: :destroy

    after_initialize :ensure_session_token 

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        user && user.is_password?(password) ? user : nil 
    end 

    def password=(password)
        @password = password 
        self.password_digest = BCrypt::Password.create(password)
    end 

    def is_password?(password)
        bcrypt_password = BCrypt::Password.new(self.password_digest)
        bcrypt_password.is_password?(password)
    end 

    def reset_session_token 
        self.session_token = User.generate_session_token 
        self.save 
        self.session_token
    end 

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end 

    private 

    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end 
end
