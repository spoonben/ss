Router.configure({
	layoutTemplate: 'appLayout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading',
	waitOn: function() {
		return [Meteor.subscribe('notifications')]
	}
});

Router.route('login', {
	path: '/login',
	template: 'login',
	layoutTemplate: 'loginLayout'
});

Router.route('home', {
	path: '/',
	action: function() {
		this.redirect('/explore/artists')
	}
});

Router.route('feed', {
	path: '/feed',
	template: 'feedTemplate'
});