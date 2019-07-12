class User < ApplicationRecord
  has_many :bills, dependent: :destroy

  def sort_by_balance
    self.bills.order(:balance)
  end

  def sort_by_apr_desc
    self.bills.order(APR: :desc)
  end
end
