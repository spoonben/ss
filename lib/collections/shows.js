Shows = new Mongo.Collection('shows');

Shows.allow({
	insert: function(userId, doc) {
		return !! userId;
	}
});