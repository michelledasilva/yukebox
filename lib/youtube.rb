require 'nokogiri'
require 'net/http'

class Youtube

  def self.search(query)
  # Search Youtube

    query = URI.escape( query )
    url = URI.parse( "http://gdata.youtube.com/feeds/api/videos?q=#{query}&start-index=1&max-results=10&v=2&category=Music" )
    response = Net::HTTP.get( url )

    # Fake response (just for testing)
    #response = File.read('sample.xml')

    # Make the results useful with Nokogiri
    doc = Nokogiri.XML( response )

    videos = []
    
    # Find each 'entry'
    doc.css('entry').each do |entry|

      title = entry.css('title').text
      length = entry.xpath('./media:group/yt:duration').first['seconds']

      videos << {:title => title, :length => length}
    end
    
    videos
  end
end