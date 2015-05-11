Meteor.publish('notifications', function() {
  return Notifications.find({ownerId: this.userId});
});