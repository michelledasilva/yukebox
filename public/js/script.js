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
});

function showSearchResults(data){
  console.log(data);
  var list = $("<ul></ul>");
  
  for( var i = 0; i < data.length; i++ ) {
    var video = data[i];
    
    var r = $("<li>" + video.title + " (" + video.length + ")</li>");
    list.append( r )
  }
  
  $('#results').html( list );
}





















