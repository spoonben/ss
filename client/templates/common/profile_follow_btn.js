Template.profileFollowBtn.helpers({
	isFollowing: function() {
		var userParam = Router.current().params.userName;
		var viewedUser = Meteor.users.findOne({ username: userParam });

		if (_.include(Meteor.user().profile.following, viewedUser._id)) {
			return true;
		} else {
			return false;
		}
	}
});

Template.profileFollowBtn.events({
	'click .artist__follow': function(e,t) {
		var currentArtist = Router.current().params.userName;
		Meteor.call('follow', currentArtist);
	}
});