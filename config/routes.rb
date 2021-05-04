Rails.application.routes.draw do
  resources :users, only: :create

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
