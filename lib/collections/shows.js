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
	incPlayCount: function(showId, artistName) {
		check(showId, String);
		check(artistName, String);

		var show = Shows.findOne(showId);

		if (!show) {
			alert('Something went wrong, try again.');
		}

		//increment show plays by one
		Shows.update( { _id: showId } , { $inc: { plays: 1 } } );
		//increment artist plays by one
		Meteor.users.update({ username: artistName }, { $inc: { 'profile.plays': 1 } });
	},

	upvote: function(showId) {
		check(showId, String);

		var show = Shows.findOne(showId);

		if (!show) {
			alert('Something went wrong, try again.');
		} 
		else if (_.include(show.upvoters, Meteor.userId())) {
			Shows.update( { _id: show._id }, {
				$pull: {upvoters: Meteor.userId()},
				$inc: {score: -1}
			} );

			//increments total artist score by 1
			Meteor.users.update({ username: show.artist }, { $inc: { 'profile.score': -1 } });

			//removes show id from the user's upvote list
			Meteor.users.update( { _id: Meteor.userId() }, {
				$pull: {'profile.upvotes': showId}
			});

			//removes artist from the user's liked artist list HOLY ANNOYING
			var usersUpvotes = Meteor.user().profile.upvotes;
			var likedArtists = Meteor.user().profile.likedArtists;

			var upvotedShowArtist = Shows.findOne(showId).artistId;

			_.each(likedArtists, function(artistId) {
				var artistShows = Shows.find({artistId: artistId});

				var showIdArray = [];
				var len = artistShows.length;
				for (var i = 0; i < len; i++) {
			    showIdArray.push(
			      artistShows[i]._id
			    );
				}

				if (!_.contains(usersUpvotes, showIdArray)) {
					Meteor.users.update( { _id: Meteor.userId() }, {
						$pull: {'profile.likedArtists': show.artistId}
					});
				}
			});

		}
    else if (show.artistId === Meteor.userId()) {
			alert('You can\'t upvote your own shows.');
		}
		else {
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
	}
});

//Search Shit for Shows
EasySearch.createSearchIndex('shows', {
    'collection': Shows,
    'field': ['artistDisplay', 'venue']
});