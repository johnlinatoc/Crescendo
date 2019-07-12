# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require 'securerandom'
require 'chronic'

User.delete_all
Bill.delete_all

user_name = []

10.times do
  user_name << Faker::Name.name
end

users = []

user_name.each do |name|
  users << User.create(
    name: name,
    snowball_starter: 100
  )
end

users.each do |user|
  num_of_bills = (rand(3...5)).floor

  (1..num_of_bills).each do |bill|

    bill_name = Faker::Company.name;
    bill_balance = (rand(800...3000));
    bill_min_payment = (rand(30...50));
    bill_APR = ((SecureRandom.random_number(35)).to_f)/100;
    bill_date = "#{rand(14...31)}/#{rand(7...12)}/2019"

    Bill.create(
      name: bill_name,
      balance: bill_balance,
      APR: bill_APR,
      due_date: bill_date,
      user_id: user.id,
      min_payment: bill_min_payment
    )
  end

end


#==============================end
