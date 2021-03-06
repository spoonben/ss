Template.player.rendered = function() {
	var playerAudio = document.getElementById('player__audio');
	window.updateTimer;
	//PLAY AND PAUSE 

	$('.controls__play').on('click', function(){
		var icon = $(this).find($('.fa'));

		playOrPause();
	});

	function playOrPause() {
		if(!playerAudio.paused && !playerAudio.ended) {
			playerAudio.pause();
			window.clearInterval(window.updateTimer);
			$('.controls__play-icon').html('<use xlink:href="#shape-play"></use>');
		} else {
			playerAudio.play();
		  window.updateTimer = window.setInterval(updateTrackTime, 500);
			$('.controls__play-icon').html('<use xlink:href="#shape-pause"></use>');
		}
	}

	$('#player__audio').bind('ended', function(){
		window.clearInterval(window.updateTimer);
		$('.controls__play-icon').html('<use xlink:href="#shape-play"></use>');
	});

	//MUTE & UNMUTE

	$('.player__volume-square').on('click', function(){
		if(playerAudio.muted === true) {
			playerAudio.muted = false;
			$('.player__volume-icon').html('<use xlink:href="#shape-volume-hi"></use>');
		} else {
			playerAudio.muted = true;
			$('.player__volume-icon').html('<use xlink:href="#shape-volume-mute"></use>');
		}
	});

	//DISPLAY TIME OF SONG PLAYED
	playerAudio.addEventListener('loadedmetadata', function() {
		var seconds = playerAudio.duration;
		var duration = moment.duration(seconds, 'seconds');

		var time = '';
		var hours = duration.hours();

		if (hours > 0) {
			time = hours + ':';
		}

		time = time + duration.minutes() + ':' + duration.seconds();

		$('.player__duration').html(time);

	});
	
	function updateTrackTime() {
		var playedSeconds = playerAudio.currentTime;
		var duration = moment.duration(playedSeconds, 'seconds');

		var time = '';
		var hours = duration.hours();

		if (hours > 0) {
			time = hours + ':';
		}		

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
			window.clearInterval(window.updateTimer);
		}
	}

	//Click the Progress Bar
	$('.player__progress').on('click', function(e){
		var barBg = $(window).width();
		var mouseX = e.pageX - $(this).offset().left;
		var newTime = mouseX*playerAudio.duration/barBg;

		
		playerAudio.currentTime = newTime;

		$('.player__progressbar').css('width', mouseX + 'px');

		$('.player__current-time').text($('.player__progress-time').text());
		
	});


	$('.player__progress').on('mousemove', function(e) {
		//functional
		var barBg = $(window).width();
		var mouseX = e.pageX - $(this).offset().left;
		var newTime = mouseX*playerAudio.duration/barBg;
		var minutes = parseInt(newTime/60);
		var seconds = parseInt(newTime%60);

		if(seconds < 10) {
			$('.player__progress-time').html(minutes + ':0' + seconds);
		} else {
			$('.player__progress-time').html(minutes + ':' + seconds);
		}

		//visual
		var x = e.clientX;
		var y = e.clientY;
		$('.player__progress-time').css('top', (y + -32) + 'px');
		$('.player__progress-time').css('left', (x + 0) + 'px');
	});

	//VOLUME
	$('.player__volume-bar').on('change', function(){
		playerAudio.volume = $(this).val();
	});
};