Rails.application.routes.draw do
	root 'home#index'

	post '/analyse' => 'home#analyse'
	post '/upload' => 'home#upload'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
