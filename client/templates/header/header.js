Template.header.events({
	'click #signout': function(e) {
		e.preventDefault();
		Meteor.logout();
	},

	'click #header-nav-feed': function(e,t) {
		Meteor.call('updateNotifications', Meteor.userId());
	}
});

Template.header.helpers({
	notificationCount: function() {
		return Notifications.find({ownerId: Meteor.userId(), read: false}).count();
	}
});