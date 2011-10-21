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

      begin
        title = entry.css('title').text
        length = entry.xpath('./media:group/yt:duration').first['seconds']
        id = entry.xpath('./media:group/yt:videoid').first.text
        
        if media_content_tag = entry.xpath('./media:group/media:content[@yt:format=5]').first
          url = media_content_tag['url']
          type = media_content_tag['type']
          
          videos << {:id => id, :title => title, :length => length, :url => url, :type => type}
        end
        
      rescue
      end
    end
    
    videos
  end
end