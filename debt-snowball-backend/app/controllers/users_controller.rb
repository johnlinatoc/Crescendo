class UsersController < ApplicationController

  def index
    users = User.all
    render json: users, include: [:bills]
  end

  def show
    user = User.find(params[:id])
    # bills.orderbyapr
    render json: bills
  end
end
