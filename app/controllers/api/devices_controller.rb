class Api::DevicesController < ApplicationController

	before_action :set_device, only: [:update, :destroy]

  def index
    render json: Device.all
  end

  def create
    device = Device.new(device_params)
    if device.save
      render json: device, status: :created
    else
      render json: { errors: device.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @device.update(device_params)
      render json: @device
    else
      render json: { errors: @device.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @device.destroy
    head :no_content
  end

  private

  def set_device
    @device = Device.find(params[:id])
  end

  def device_params
    params.require(:device).permit(:name, :ip_address, :status, :active)
  end

end
