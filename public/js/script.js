/* Author: Michelle Da Silva

*/

var Yukebox = {};
Yukebox.player = null;

function doSearch() {
  $('#results').html("<em>Searching...</em>");
  $('#results_help').hide();
    
  var q = $("#search").val();
  var u = "/search?q=" + encodeURIComponent(q);
  $.ajax({
    url: u,
    type: 'GET',
    success: showSearchResults
  });
}

$(document).ready( function() {
  $("#search_btn").click(doSearch);
  $("#search").keypress(function(e){
    if(e.which == 13) {
      doSearch();
    }
  });
  
  $('li.result-video').live('click', function(){
    //console.log( $(this) );
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
    }
  });
  
  $('li.queue-video').live('click', function(){
    $(this).remove();
  });
});

function showSearchResults(data){
  //console.log(data);
  var list = $("<ul></ul>");
  
  for( var i = 0; i < data.length; i++ ) {
    var video = data[i];
    
    var hours = parseInt( video.length / 3600 ) % 24;
    var minutes = parseInt( video.length / 60 ) % 60;
    var seconds = video.length % 60;
    
    var formatted_date;
    if( hours > 0) {
      formatted_length = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
    } else {
      formatted_length = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
    }
    
    var r = $("<li class=\"result-video\" data-vid=\"" + video.id +"\" data-url=\"" + video.url + "\" data-type=\"" + video.type + "\">" + video.title + " (" + formatted_length + ")</li>");
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