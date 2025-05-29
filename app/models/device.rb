class Device < ApplicationRecord

	enum status: { online: 0, offline: 1 }

  validates :name, :ip_address, :status, presence: true

end
