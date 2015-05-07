Template.showTemplate.helpers({
	//checks if the current user owns this show or not
	usersShow: function() {
		return Meteor.user().username === this.artist;
	}
});

Template.showTemplate.events({
	'mouseenter .show': function(e,t) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		var $showActions = $('.show').find($('.show__actions'));
		var animationName = 'animated fadeIn';

		$showActions.addClass(animationName).one(animationEnd, function() {
			$showActions.removeClass(animationName);
		});
	},

	'click .show__title-link': function(e,t) {
		var playerAudio = document.getElementById('player__audio');
		playerAudio.src = this.audio;
		$('.player__show-artist').text(this.artistDisplay);
		$('.player__show-venue').text(this.venue);
		$('.player__show-date').text(this.date);
		$('.player__info').fadeIn();
		$('.player__count').fadeIn();
		$('.player__progress').show();
	}
});

Template.showTemplate.rendered = function() {
	$(window).on('resize', function() {
  	var picWidth = $('.artist__photo').width();
  	var showWidth = $('.show').width();

  	$('.artist__photo').css('height', picWidth + 'px');
    $('.show').css({'height':showWidth+'px'});
  }).resize();
};