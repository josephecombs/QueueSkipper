# == Schema Information
#
# Table name: line_listings
#
#  id          :integer          not null, primary key
#  lister_id   :integer
#  booker_id   :integer
#  price       :integer
#  line_id     :integer
#  active      :boolean
#  latitude    :float
#  longitude   :float
#  description :text
#  created_at  :datetime
#  updated_at  :datetime
#

class LineListing < ActiveRecord::Base
  
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
  
  has_many :line_listing_images

  
end
