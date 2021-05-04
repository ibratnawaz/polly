Rails.application.routes.draw do
  resources :users, only: :create
  resource :sessions, only: [:create, :destroy]
  resources :polls, except: %i[new edit]

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
