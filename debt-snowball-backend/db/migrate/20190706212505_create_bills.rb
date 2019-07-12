class CreateBills < ActiveRecord::Migration[5.2]
  def change
    create_table :bills do |t|
      t.string :name
      t.integer :balance
      t.integer :min_payment
      t.float :APR
      t.date :due_date

      t.timestamps
    end
  end
end
