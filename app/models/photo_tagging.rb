# == Schema Information
#
# Table name: photo_taggings
#
#  id         :integer          not null, primary key
#  photo_id   :integer          not null
#  user_id    :integer          not null
#  x_pos      :integer          not null
#  y_pos      :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PhotoTagging < ActiveRecord::Base
  attr_accessible :photo_id, :user_id, :x_pos, :y_pos

  belongs_to :photo
  belongs_to :user

  validates :photo_id, :user_id, :x_pos, :y_pos, :presence => true
end
