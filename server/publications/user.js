Meteor.publish('currentUser', function() {

	return Meteor.users.find(this.userId);
});