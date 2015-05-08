Router.route('explore', {
	path: '/explore',
	action: function() {
		this.redirect('/explore/artists/top')
	}
});

//==============================
// Explore Artists
//==============================

Router.route('exploreArtists', {
	path: '/explore/artists',
	action: function() {
		this.redirect('/explore/artists/top')
	}
});

Router.route('exploreArtistsTop', {
	path: '/explore/artists/top',
	controller: 'ExploreArtistsTopController'
});

Router.route('exploreArtistsPlays', {
	path: '/explore/artists/plays',
	controller: 'ExploreArtistsPlaysController'
});

Router.route('exploreArtistsName', {
	path: '/explore/artists/name',
	controller: 'ExploreArtistsNameController'
});

//Controllers

ExploreArtistsTopController = RouteController.extend({
	template: 'exploreArtistsTop',
	waitOn: function() {
		return [
			Meteor.subscribe('artistsTop')
		];
	}
});

ExploreArtistsPlaysController = RouteController.extend({
	template: 'exploreArtistsPlays',
	waitOn: function() {
		return [
			Meteor.subscribe('artistsPlays')
		];
	}
});

ExploreArtistsNameController = RouteController.extend({
	template: 'exploreArtistsName',
	waitOn: function() {
		return [
			Meteor.subscribe('artists')
		];
	}
});

//==============================
// Explore Shows
//==============================

Router.route('exploreShows', {
	path: '/explore/shows',
	action: function() {
		this.redirect('/explore/shows/top')
	}
});

Router.route('exploreShowsTop', {

});