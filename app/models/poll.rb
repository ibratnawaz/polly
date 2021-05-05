class Poll < ApplicationRecord
  belongs_to :user
  has_many :options, dependent: :destroy

  accepts_nested_attributes_for :options, allow_destroy: true

  validates :title, presence: true, length: { maximum: 161 }
end
