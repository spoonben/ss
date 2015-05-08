Meteor.publish('currentUser', function() {

	return Meteor.users.find(this.userId);
});

Meteor.publish('artists', function() {
	return Meteor.users.find({roles: ['Artist']});
});