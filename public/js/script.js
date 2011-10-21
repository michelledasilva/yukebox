/* Author: Michelle Da Silva

*/

var Yukebox = {};
Yukebox.player = null;


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
    //var url = $(this).data('url');
    var type = $(this).data('type');
    var url = "http://www.youtube.com/e/" + $(this).data('vid') + "?enablejsapi=1&version=3"

    var params = { allowScriptAccess: "always" };
    var atts = { id: "ytplayer" };
    swfobject.embedSWF(url, "player", "425", "356", "8", null, null, params, atts);
    
  });
});

function showSearchResults(data){
  console.log(data);
  var list = $("<ul></ul>");
  
  for( var i = 0; i < data.length; i++ ) {
    var video = data[i];
    
    var r = $("<li class=\"result-video\" data-vid=\"" + video.id +"\" data-url=\"" + video.url + "\" data-type=\"" + video.type + "\">" + video.title + " (" + video.length + ")</li>");
    list.append( r )
  }
  
  $('#results').html( list );
}

function onYouTubePlayerReady(playerid) {
  Yukebox.player = document.getElementById("player");
}



















