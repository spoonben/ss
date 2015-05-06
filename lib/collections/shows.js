Shows = new Mongo.Collection('shows');

Shows.allow({
	insert: function(userId, doc) {
		return !! userId;
	},

	update: function(userId, doc) {
		return !! userId;
	},

	remove: function(userId, doc) {
		return !! userId;
	}
});

// Shows.deny({
// 	update: function(userId, show, fieldNames) {
// 		return (_.without(fieldNames, 'artist', 'artistDisplay', 'audio', 'plays', 'score').length > 0);
// 	}
// });
