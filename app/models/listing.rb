class Listing < ActiveRecord::Base
  validates :latitude, :longitude, :description, :max_price, :lister_id, presence: true
  
  belongs_to(
    :lister,
    class_name: "User",
    foreign_key: :lister_id,
    primary_key: :id
  )
  
  belongs_to(
    :booker,
    class_name: "User",
    foreign_key: :booker_id,
    primary_key: :id
  )
end
