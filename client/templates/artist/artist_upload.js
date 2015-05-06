var audioUrl; // s3 audio url
var imageUrl; // s3 img url


//Template Events
Template.uploadShow.events({
	//uploads the audio file to S3
	'change #upload-form-audio': function(e,t) { 
		var audioUploader = new Slingshot.Upload('audioUpload');

		audioUploader.send(document.getElementById('upload-form-audio').files[0], function(err, downloadUrl) {
			if (err) {
		    // Log service detailed response
		    // console.log('Error uploading' + audioUploader.xhr.response);
		    alert(err);
		  }
		  else {
		    audioUrl = downloadUrl;
		  }
		});
	},

	//uploads the show picture to S3
	'change #upload-form-image': function(e,t) { 
		var imageUploader = new Slingshot.Upload('showImgUpload');

		imageUploader.send(document.getElementById('upload-form-image').files[0], function(err, downloadUrl) {
			if (err) {
		    // Log service detailed response
		    // console.log('Error uploading' + imageUploader.xhr.response);
		    alert(err);
		  }
		  else {
		    imageUrl = downloadUrl;
		  }
		});
	},

	'submit .upload__form': function(e,t) {
		e.preventDefault();

		var artistName = Meteor.user().username;
		var artistDisplay = Meteor.user().profile.name;
		var venueName = t.find('#upload-show-venue').value;
		var showDate = t.find('#upload-show-date').value;
		var price = t.find('#upload-show-price').value;

		//if no show image is selected use the artist profile picture
		if(!imageUrl) {
			imageUrl = Meteor.user().profile.picture;
		}

		Meteor.call('createShow', artistName, artistDisplay, audioUrl, venueName, showDate, price, imageUrl);
	},

	'click .upload__close': function(e,t) {
		t.$('.upload').fadeOut();
	}
});

//Template Helpers


//jQuery stuffs
Template.uploadShow.rendered = function() {
	$(window).on('resize', function(){
		$('.upload__inner').css('max-height', window.innerHeight - 203 + "px");
	}).resize();

	$(document).on('keydown', function(e) {
		if(e.keyCode === 27) {
			$('.upload').fadeOut();
		}
	});

	//date picker
	var datePicker = new Pikaday({	
		field: $('#upload-show-date')[0],
		format: 'l'
	});

	$('#upload-show-date').on('keydown', function(e){
		return false;
	});
};