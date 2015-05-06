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
				picture: '/images/placeholder.png',
				likes: [],
				followers: [],
				following: []
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
				likes: [],
				followers: [],
				following: []
			}
		});

		//Assigns THE NEW USER TO THE ARTIST ROLE
		Roles.addUsersToRoles(newFan, [role]);
	}
});