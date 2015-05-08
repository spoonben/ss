Template.libraryTemplate.helpers({
	likedArtists: function() {
		var upvotedArtists = Meteor.user().profile.likedArtists;

		return Meteor.users.find( { _id : { $in : upvotedArtists } } );
	},

	shows: function(artistName) {
		var upvotedShows = Meteor.user().profile.upvotes;

		return Shows.find( { $and: [ { _id: { $in: upvotedShows } }, { artistId: artistName } ] } );
	} 
});



Template.libraryTemplate.rendered = function() {
	$('.library__list-item-link').on('click', function(e) {
		e.preventDefault();

		if ($(this).hasClass('is-active')) {
			$(this).removeClass('is-active');
		} else {
			$(this).addClass('is-active');
			$(window).resize();
		}
		$(window).resize();
	});
};