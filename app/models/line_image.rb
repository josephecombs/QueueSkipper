# == Schema Information
#
# Table name: line_images
#
#  id         :integer          not null, primary key
#  line_id    :integer
#  img_link   :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class LineImage < ActiveRecord::Base
end
