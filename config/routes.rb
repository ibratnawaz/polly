Rails.application.routes.draw do
  resources :users, only: :create
  resource :sessions, only: [:create, :destroy]

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
