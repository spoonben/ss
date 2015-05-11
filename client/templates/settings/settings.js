Template.settings.events({
	//edits the user's settings
	'submit .settings__form': function(e, t) {
		e.preventDefault();

		var displayName = $(t.find($('#settings-name'))).val();
		var blast = $(t.find($('#settings-blast'))).val();

		if (displayName === '') {
			alert('Display name is required');
		} else {
			Meteor.users.update(Meteor.userId(), { $set: {
				'profile.name': displayName,
				'profile.blast': blast
			} }, function(err) {
				if(err) {
					alert(err.reason);
				} else {
					if (Meteor.user().roles[0] === 'Artist') {
						Router.go('artist', { userName: Meteor.user().username });
					} else {
						Router.go('fan', { userName: Meteor.user().username });
					}
				}
			});
		}
	},

	//deletes the show
	'click .settings__deleteBtn': function(e,t) {
		$('.delete').fadeIn();
	},

	'submit .delete__form': function(e, t) {
		e.preventDefault();
		Meteor.call('deleteUser', Meteor.userId());
		Router.go('/login');
	},

	'click .delete__close': function(e,t) {
		$('.delete').fadeOut();
	},

	'click .show__edit-back': function(e,t) {
		e.preventDefault();

		window.history.back();
	}
});