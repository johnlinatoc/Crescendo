class BillsController < ApplicationController

  def index
    bills = Bill.all
    render json: bills
  end

  def show
    bill = Bill.find_by(id: params[:id])
    render json: bill
  end

  def create
    bill = Bill.create(name: params[:name], balance: params[:balance], APR: params[:APR], min_payment: params[:min_payment], user_id: params[:user_id])
    render json: bill
  end

  def update
    bill = Bill.find_by(id: params[:id])
    bill.update(name: params[:name],balance: params[:balance], APR: params[:APR], min_payment: params[:min_payment])
    render json: bill
  end

  def destroy
    @bill = Bill.find_by(id: params[:id])
    @bill.destroy
  end
end
