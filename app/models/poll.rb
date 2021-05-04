class Poll < ApplicationRecord
  has_many :options, dependent: :destroy

  validates :title, presence: true, length: { maximum: 161 }
end
