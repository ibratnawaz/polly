class Option < ApplicationRecord
  belongs_to :poll
  validates :option, presence: true
end
