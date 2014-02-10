# == Schema Information
#
# Table name: photos
#
#  id         :integer          not null, primary key
#  owner_id   :integer          not null
#  title      :string(255)      not null
#  url        :string(255)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Photo < ActiveRecord::Base
  attr_accessible :owner_id, :title, :url

  belongs_to :owner, :class_name => "User"
  has_many :photo_taggings
  has_many(
    :tagged_users,
    :through => :photo_taggings,
    :source => :user
  )

  validates :owner_id, :title, :url, :presence => true
end
