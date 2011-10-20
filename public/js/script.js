/* Author: Michelle Da Silva

*/

$(document).ready( function() {
  $("#search_btn").click(function() {
    var q = $("#search").val();
    var u = "/search?q=" + $.param(q);
    $.ajax({
      url: u,
      type: 'GET',
      success: showSearchResults
      
    });
  });
});

function showSearchResults(data){
  console.log(data);
}





















