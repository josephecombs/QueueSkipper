# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  session_token   :string(255)
#  password_digest :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  validates :username, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, uniqueness: true

  attr_reader :password

  has_many(
    :line_listings,
    class_name: "LineListing",
    foreign_key: :lister_id,
    primary_key: :id
  )
  
  has_many(
    :line_bookings,
    class_name: "LineListing",
    foreign_key: :booker_id,
    primary_key: :id
  )

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
