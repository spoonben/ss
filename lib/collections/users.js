Meteor.methods({
	createArtist: function(username, email, password, name, role) {
		//validate the entered fields 
		check(username, String);
		check(email, String);
		check(password, String);
		check(name, String);
		check(role, String);

		//creates the new artist
		var newArtist;
		newArtist = Accounts.createUser({
			username: username,
			email: email,
			password: password,
			profile: {
				name: name,
				score: 0,
				plays: 0,
				picture: '/images/placeholder.png',
				upvotes: [],
				likedArtists: [],
				followers: [],
				followersCount: 0,
				following: [],
				followingCount: 0,
				showsCount: 0
			}
		});

		//Assigns THE NEW USER TO THE ARTIST ROLE
		Roles.addUsersToRoles(newArtist, [role]);
	},

	createFan: function(username, email, password, name, role) {
		//validate the entered fields 
		check(username, String);
		check(email, String);
		check(password, String);
		check(name, String);
		check(role, String);

		//creates the new artist
		var newFan;
		newFan = Accounts.createUser({
			username: username,
			email: email,
			password: password,
			profile: {
				name: name,
				picture: '/images/placeholder.png',
				upvotes: [],
				likedArtists: [],
				likedArtists: [],
				followers: [],
				followersCount: 0,
				following: [],
				followingCount: 0
			}
		});

		//Assigns THE NEW USER TO THE ARTIST ROLE
		Roles.addUsersToRoles(newFan, [role]);
	},

	follow: function(userName) {
		check(userName, String);

		var followedUser = Meteor.users.findOne({username: userName});

		if (_.contains(Meteor.user().profile.following, followedUser._id)) {
			//remove user from following (unfollow)
			Meteor.users.update( { _id: Meteor.userId() }, {
				$pull: { 'profile.following': followedUser._id },
				$inc: { 'profile.followingCount': -1 }
			});
			//remove current user from followed's list
			Meteor.users.update( { _id: followedUser._id },  {
				$pull: { 'profile.followers': Meteor.userId() },
				$inc: { 'profile.followersCount': -1 }
			});
			//remove all of their notifications
			removeFollowingNotifications(followedUser._id);

		} else {
			//update current user's following list 
			Meteor.users.update( { _id: Meteor.userId() }, {
				$addToSet: { 'profile.following': followedUser._id },
				$inc: { 'profile.followingCount': 1 }
			});
			//update the followed user's followers list
			Meteor.users.update( { _id: followedUser._id },  {
				$addToSet: { 'profile.followers': Meteor.userId() },
				$inc: { 'profile.followersCount': 1 }
			});

			createFollowingNotification(followedUser._id);
		}
	}


});