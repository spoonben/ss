Template.showTemplate.helpers({
	//checks if the current user owns this show or not
	usersShow: function() {
		return Meteor.user().username === this.artist;
	},

	upvotedClass: function() {
		var currentUser = Meteor.user();
		if (_.contains(currentUser.profile.upvotes, this._id)) {
			return 'upvoted';
		}
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
		//load the show into the player
		$('.player__show-artist').text(this.artistDisplay);
		$('.player__show-venue').text(this.venue);
		$('.player__show-date').text(this.date);
		$('.player__info').fadeIn();
		$('.player__count').fadeIn();
		$('.controls__play-icon').html('<use xlink:href="#shape-play"></use>');
		$('.controls__play').fadeIn();
		$('.player__progress').show();

		//increment play count by one
		Meteor.call('incPlayCount', this._id, this.artist);
	},

	'click .show__actions-vote--up': function(e,t) {
		e.preventDefault();

		Meteor.call('upvote', this._id);
	}
});