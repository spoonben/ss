Template.editShow.events({
	//submits the form
	'submit .show__edit-form': function(e, t) {
		e.preventDefault();

		var showProperties = {
			venue: $(e.target).find('#show-edit-venue').val(),
			date: $(e.target).find('#show-edit-date').val(),
			price: $(e.target).find('#show-edit-price').val()
		};

		if (showProperties.venue === '' || showProperties.date === '' || showProperties.price === '') {
			alert('All fields except background image are required.');
		} else {
			Shows.update(Router.current().params._id, { $set: showProperties }, function(err) {
				if(err) {
					alert(err.reason);
				} else {
					Router.go('artist', { userName: Meteor.user().username });
				}
			});
		}
	},

	//uploads new bg image to S3
	'change #show-edit-image': function(e,t) {
		var editImageUploader = new Slingshot.Upload('showImgUpload');

		editImageUploader.send(document.getElementById('show-edit-image').files[0], function(err, downloadUrl) {
			if (err) {
		    // Log service detailed response
		    // console.log('Error uploading' + imageUploader.xhr.response);
		    alert(err);
		  }
		  else {
		    Meteor.call('changeShowBg', Router.current().params._id, downloadUrl);
		  }
		});
	},

	//deletes the show
	'click .show__edit-deleteBtn': function(e,t) {
		$('.delete').fadeIn();
	},

	'submit .delete__form': function(e, t) {
		e.preventDefault();
		Shows.remove({_id: Router.current().params._id}, function(err) {
			if(err) {
				alert(err.reason);
			} else {
				Meteor.users.update(Meteor.userId(), {$inc: { 'profile.showsCount': -1 } });
				Router.go('artist', {userName: Meteor.user().username });
			}
		});
	},

	'click .delete__close': function(e,t) {
		$('.delete').fadeOut();
	},

	'click .show__edit-back': function(e,t) {
		e.preventDefault();

		window.history.back();
	}
});

Template.editShow.rendered = function() {
	$(document).on('keydown', function(e) {
		if(e.keyCode === 27) {
			$('.delete').fadeOut();
		}
	});

	var editDatePicker = new Pikaday({	
		field: $('#show-edit-date')[0],
		format: 'l'
	});

	$('#show-edit-date').on('keydown', function(e){
		return false;
	});
};