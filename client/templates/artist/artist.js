var profPicUrl;

//helpers
Template.artistTemplate.helpers({
	shows: function() {
		var currentArtist = Router.current().params.artistName;
		return Shows.find({artist: currentArtist});
	}
});


//events
Template.artistTemplate.events({
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
Template.artistTemplate.rendered = function() {
	$(window).on('resize', function() {
  	var picWidth = $('.artist__photo').width();
  	$('.artist__photo').css('height', picWidth + 'px');
  }).resize();
};