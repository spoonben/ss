var profPicUrl;

//helpers
Template.fanTemplate.helpers({
	followersCount: function() {
		var currentArtist = Router.current().params.userName;
		return Meteor.users.findOne({username: currentArtist}).profile.followersCount;
	},

	followingCount: function() {
		var currentArtist = Router.current().params.userName;
		return Meteor.users.findOne({username: currentArtist}).profile.followingCount;
	}
});

//events
Template.fanTemplate.events({
	'change #profile-photo-input': function() {
		var profPicUploader = new Slingshot.Upload('profPicUpload');

		profPicUploader.send(document.getElementById('profile-photo-input').files[0], function(err, downloadUrl) {
			if (err) {
		    // Log service detailed response
		    alert(err);
		  }
		  else {
		    Meteor.call('changeProfPic', downloadUrl);
		  }
		});
	}	
});

//jquery after render
Template.fanTemplate.rendered = function() {
	$(window).on('resize', function() {
  	var picWidth = $('.artist__photo').width();
  	$('.artist__photo').css('height', picWidth + 'px');
  }).resize();
};