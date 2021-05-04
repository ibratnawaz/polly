class PollsController < ApplicationController
  before_action :load_poll, only: [:show, :update, :destroy]

  def index
    polls = Poll.all
    render status: :ok, json: { polls: polls }
  end

  def show
    render status: :ok, json: { poll: @poll.as_json(include: {
        options: {
          only: [:option, :id, :vote]
        }
      })
    }
  end

  def create
    @poll = Poll.new(poll_params)
    if @poll.save
      render status: :ok, json: { notice: "Poll created successfully!" }
    else
      render status: :unprocessable_entity, json: { error: @poll.errors.full_messages.to_sentence}
    end
    
  end

  private
    def load_poll
      @poll = Poll.find(params[:id])
    end
    
    def poll_params
      params.require(:poll).permit(:title, options_attributes: [:id, :name, :vote])
    end
end
