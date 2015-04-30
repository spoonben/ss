Router.configure({
	layoutTemplate: 'appLayout',
	loadingTemplate: 'loading'
});

Router.route('login', {
	path: '/login',
	template: 'login',
	layoutTemplate: 'loginLayout'
});

Router.route('home', {
	path: '/',
	action: function() {
		this.redirect('/explore')
	}
});

Router.route('explore', {
	path: '/explore',
	template: 'exploreTemplate'
});

Router.route('library', {
	path: '/library',
	template: 'libraryTemplate'
});

Router.route('feed', {
	path: '/feed',
	template: 'feedTemplate'
});

Router.route('fan', {
	path: '/fan/:fanName',
	template: 'fanTemplate'
});