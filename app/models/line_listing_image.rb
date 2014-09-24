# == Schema Information
#
# Table name: line_listing_images
#
#  id              :integer          not null, primary key
#  line_listing_id :integer
#  img_link        :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

class LineListingImage < ActiveRecord::Base
  belongs_to :line_listing
end
