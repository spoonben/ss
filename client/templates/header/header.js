if (Meteor.isClient) {
	Template.header.events({
		'click #signout': function(e) {
			e.preventDefault();
			Meteor.logout();
		}
	});
}