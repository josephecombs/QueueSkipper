# == Schema Information
#
# Table name: lines
#
#  id             :integer          not null, primary key
#  street_address :string(255)
#  city           :string(255)
#  state          :string(255)
#  zip            :string(255)
#  floor          :integer
#  description    :text             not null
#  latitude       :float
#  longitude      :float
#  created_at     :datetime
#  updated_at     :datetime
#

class Line < ActiveRecord::Base
end
