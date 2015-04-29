if(Meteor.isClient){

	Template.registerArtist.events({
		//t param is the template itself
		'submit form': function(e, t) {
			e.preventDefault();

			var usernameVal = t.find('#registerArtistUsername').value;
			var emailVal = t.find('#registerArtistEmail').value;
			var passwordVal = t.find('#registerArtistPassword').value;
			var nameVal = t.find('#registerArtistDisplay').value;

			Accounts.createUser({
				username: usernameVal,
				email: emailVal,
				password: passwordVal,
				profile: {
					name: nameVal,
					score: 0,
					likes: [],
					followers: [],
					following: [],
				}
			});

			Router.go('explore');
		}
	});

}

