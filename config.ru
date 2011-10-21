require "./app"

use Rack::Static,
  :urls => ["/css", "/img", "/js"],
  :root => "public"

run App