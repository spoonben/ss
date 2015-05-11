Template.feedTemplate.helpers({
	notification: function() {
		return Notifications.find({ownerId: Meteor.userId()});
	},

	timeAgo: function() {
		var notificationDate = moment(this.created);
		var currentTime = moment(Date.now());

		return notificationDate.from(currentTime);
	}

	// userLink: function() {
	// 	var user = Meteor.users.find({_id: this.followerId});
		
	// 	if (user.roles === ['Artist']) {
	// 		return '/artist/' + user.username
	// 	} else {
	// 		return '/fan/' + user.username
	// 	}
	// }
});