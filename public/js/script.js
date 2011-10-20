/* Author: Michelle Da Silva

*/

$(document).ready( function() {
  $("#search_btn").click(function() {
    $('#results').html("<em>Searching...</em>");
    
    var q = $("#search").val();
    var u = "/search?q=" + encodeURIComponent(q);
    $.ajax({
      url: u,
      type: 'GET',
      success: showSearchResults
      
    });
  });
  
  $('li.result-video').live('click', function(){
    console.log( $(this) );
    var url = $(this).data('url');
    var type = $(this).data('type');
    
    /*var new_player = $("<object width=\"425\" height=\"350\"></object>");
    var param = $("<param name=\"movie\"></param>");
    param.attr('value', url);
    new_player.append( param );
    var embed = $("<embed width=\"425\" height=\"350\"></embed>");
    embed.attr({ src: url, type: type });
    new_player.append( embed );*/
    
    var new_player = "<object width=\"425\" height=\"350\">";
    new_player += "<param name=\"movie\" src=\"" + url + "\"></param>";
    new_player += "<embed width=\"425\" height=\"350\" src=\"" + url + "\" type=\"" + type + "\"></embed>";
    new_player += "</object>";
    
    console.log( new_player );
    $('#player').html( new_player );
  });
});

function showSearchResults(data){
  console.log(data);
  var list = $("<ul></ul>");
  
  for( var i = 0; i < data.length; i++ ) {
    var video = data[i];
    
    var r = $("<li class=\"result-video\" data-url=\"" + video.url + "\" data-type=\"" + video.type + "\">" + video.title + " (" + video.length + ")</li>");
    list.append( r )
  }
  
  $('#results').html( list );
}





















