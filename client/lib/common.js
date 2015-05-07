// validation 
trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
}

isValidPassword = function(val) { 
   if (val.length > 6) {
   	return true;
   } else {
   	return false;
   }
}

usernameRegex = /^[a-zA-Z0-9.\-_$@*!]{3,22}$/;

//player
function updateTrackTime() {
	var playedMinutes = parseInt(playerAudio.currentTime/60);
	var playedSeconds = parseInt(playerAudio.currentTime%60);
	var barBg = $(window).width();
	var barSize = parseInt(playerAudio.currentTime*barBg/playerAudio.duration);

	if(!playerAudio.ended) {
		//track time
		if(playedSeconds < 10) {
			$('.player__current-time').html(playedMinutes + ':0' + playedSeconds);
		} else {
			$('.player__current-time').html(playedMinutes + ':' + playedSeconds);
		}
		//Progress Bar
		$('.player__progressbar').css('width', barSize + 'px');

	} else {
		$('.player__current-time').html('0:00');
		$('.player__progressbar').css('width', '0px');
		window.clearInterval(updateTimer);
	}
}