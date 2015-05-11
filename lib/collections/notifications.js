Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) && 
      fieldNames.length === 1 && fieldNames[0] === 'read';
  },

  remove: function(userId, doc) {
		return !! userId;
	}
});

createFollowingNotification = function(followedId) {
	var followed = Meteor.users.findOne(followedId);
	var follower = Meteor.user();

	if (followedId !== Meteor.userId()) {
		Notifications.insert({
			ownerId: followed._id,
			followerId: follower._id,
			followerName: follower.profile.name,
			created: Date.now(),
			read: false
		});
	}
};

removeFollowingNotifications = function(followedId) {
	var followed = Meteor.users.findOne(followedId);
	var follower = Meteor.user();

	Notifications.remove({ownerId: followedId});
};

Meteor.methods({
	updateNotifications: function(userId) {
		check(userId, String);
		Notifications.update({ownerId: userId}, {$set: {read: true}});
	}
});