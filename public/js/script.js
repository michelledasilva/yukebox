/* Author: Michelle Da Silva

*/

var Yukebox = {};
Yukebox.player = null;

$(document).ready( function() {
  $("#search_btn").click(function() {
    $('#results').html("<em>Searching...</em>");
    $('#results_help').hide();
    
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
    if (Yukebox.player) {
      console.log("enqueue...");
      var vid = $(this).data('vid');
      $("#queue").append( "<li class=\"queue-video\" data-vid=\"" + vid + "\">" + $(this).text() + "</li>" );
    } else {
      //var url = $(this).data('url');
      var type = $(this).data('type');
      var url = "http://www.youtube.com/e/" + $(this).data('vid') + "?enablejsapi=1&version=3"

      var params = { allowScriptAccess: "always" };
      var atts = { id: "ytplayer" };
      swfobject.embedSWF(url, "player", "425", "356", "8", null, null, params, atts);

      $('#getting_started').hide();
    }
  });
});

function showSearchResults(data){
  //console.log(data);
  var list = $("<ul></ul>");
  
  for( var i = 0; i < data.length; i++ ) {
    var video = data[i];
    
    var r = $("<li class=\"result-video plus\" data-vid=\"" + video.id +"\" data-url=\"" + video.url + "\" data-type=\"" + video.type + "\">" + video.title + " (" + video.length + ")</li>");
    list.append( r )
  }
  
  $('#results').html( list );
  $('#results_help').show();
}

function onYouTubePlayerReady(playerid) {
  Yukebox.player = document.getElementById("ytplayer");

  Yukebox.player.addEventListener("onStateChange", "queueNextVideo");
}

function queueNextVideo(state) {
  // When the video is done, grab the next one and play it
  if( state == 0 ) {
    var nextVideo = $("#queue li:first");
    if (nextVideo.length > 0) {
      Yukebox.player.loadVideoById( nextVideo.data('vid') );
      nextVideo.remove();
    }
  }
}

















