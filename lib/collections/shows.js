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

Meteor.methods({
	incPlayCount: function(showId) {
		check(showId, String);

		var show = Shows.findOne(showId);

		if (!show) {
			alert('Something went wrong, try again.');
		}

		Shows.update( { _id: showId } , { $inc: { plays: 1 } } );
	},

	upvote: function(showId) {
		check(showId, String);

		var show = Shows.findOne(showId);

		if (!show) {
			alert('Something went wrong, try again.');
		}

		if (_.include(show.upvoters, Meteor.userId())) {
			alert('You can only upvote a show once.')
		}

		if (show.artistId === Meteor.userId()) {
			alert('You can\'t upvote your own shows.');
		}
		//add user to list of upvoters and increment score by 1
		Shows.update( { _id: show._id }, {
			$addToSet: {upvoters: Meteor.userId()},
			$inc: {score: 1}
		} );
		//increments total artist score by 1
		Meteor.users.update({ username: show.artist }, { $inc: { 'profile.score': 1 } });

		//adds show id to the user's upvote list
		Meteor.users.update( { _id: Meteor.userId() }, {
			$addToSet: {'profile.upvotes': showId}
		});
		
		//adds artist to the user's liked artist list
		Meteor.users.update( { _id: Meteor.userId() }, {
			$addToSet: {'profile.likedArtists': show.artistId}
		});
	}
});

// Shows.deny({
// 	update: function(userId, show, fieldNames) {
// 		return (_.without(fieldNames, 'artist', 'artistDisplay', 'audio', 'plays', 'score').length > 0);
// 	}
// });