
require "rubygems"
require "bundler/setup"
require "./lib/youtube"
require "sinatra"
require "json"

class App < Sinatra::Base
  
  get "/search" do
    #"<h1>#{params[:q]}</h1>"
    
    Youtube.search( params[:q] ).to_json
  end
  
end