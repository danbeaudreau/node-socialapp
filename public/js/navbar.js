$(document).ready(function(){
	$.get('/getFriendRequests', function( data ) {
		var requestsHTML ="<h5> Friend Requests </h5>";
		if(data.length > 0) {
			for(var i = 0; i < data.length; i++){
				requestsHTML += "<form id='" + data[i].requester + "'><div style='margin-right:5px; display:inline-block;'>" + data[i].requester + "</div><button class=\"approve btn btn-default\" style='display:inline-block;' id='"  + data[i].requester + "' type=\"button\">Approve</button><button class=\"ignore btn btn-default\" style='display:inline-block; margin-left:5px; float: right !important;' id='"  + data[i].requester + "' type=\"button\">Ignore</button></form>";
			}
			$('.glyphicon-user').css('color', 'red');

		} else {
			requestsHTML += "<h6>You don't have any friend requests.<h6>";
		}
		$("#friend_requests").popover({
			html: true,
			content: requestsHTML
		});
    });

	$('body').on('click', '.approve', function () {
	    $.post('/approveFriendRequest', {requester: $(this).attr('id')});
	    location.reload();
	});

	$('body').on('click', '.ignore', function () {
	    $.post('/ignoreFriendRequest', {requester: $(this).attr('id')});
	    location.reload();
	});

});