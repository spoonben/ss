var audioUrl;

//Template Events
Template.uploadShow.events({
	//uploads the file to S3
	'change #upload-form-file': function(e,t) { 
		var uploader = new Slingshot.Upload('audioUpload');

		uploader.send(document.getElementById('upload-form-file').files[0], function(err, downloadUrl) {
			if (err) {
		    // Log service detailed response
		    console.error('Error uploading', uploader.xhr.response);
		    alert(err);
		  }
		  else {
		    audioUrl = downloadUrl;
		  }
		});
	},

	'submit .upload__form': function(e,t) {
		var artistName = Meteor.user().username;
		var venueName = t.find('#upload-show-venue').value;
		var showDate = t.find('#upload-show-date').value;
		var price = t.find('#upload-show-price').value;

		Meteor.call('createShow', artistName, audioUrl, venueName, showDate, price);
	},

	'click .upload__close': function(e,t) {
		t.$('.upload').fadeOut();
	}
});

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
		format: 'MMM D YYYY'
	});

	$('#upload-show-date').on('keydown', function(e){
		return false;
	});
};