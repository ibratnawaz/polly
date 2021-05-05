class PollsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: :index
  before_action :load_poll, only: [:show, :update, :destroy]

  def index
    polls = Poll.all.order('created_at DESC')
    render status: :ok, json: { polls: polls }
  end

  def show
    authorize @poll
    render status: :ok, json: { poll: @poll.as_json(include: {
        options: {
          only: [:option, :id, :vote]
        }
      })
    }
  end

  def create
    @poll = Poll.new(poll_params)
    authorize @poll
    if @poll.save
      render status: :ok, json: { notice: "Poll created successfully!" }
    else
      render status: :unprocessable_entity, json: { error: @poll.errors.full_messages.to_sentence}
    end
    
  end

  def destroy
    authorize @poll
    if @poll.destroy
      render status: :ok, json: { 
        notice: 'Successfully deleted poll.'
      }
    else
      errors = @poll.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private
    def load_poll
      @poll = Poll.find(params[:id])
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: e }, status: :not_found
    end
    
    def poll_params
      params.require(:poll).permit(:title, :options_attributes => [:id, :option]).merge(user_id: @current_user.id)
    end
end
