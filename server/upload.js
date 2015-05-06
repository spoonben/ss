Meteor.methods({
	createShow: function(artistName, artistDisplay, audioUrl, venueName, showDate, price, imageUrl) {
		check(artistName, String);
    check(artistDisplay, String);
		check(audioUrl, String);
		check(venueName, String);
		check(showDate, String);
		check(price, String);
		check(imageUrl, String);

		Shows.insert({
			artist: artistName,
      artistDisplay: artistDisplay,
			venue: venueName,
			date: showDate,
			price: price,
			audio: audioUrl,
			image: imageUrl,
			plays: 0,
			score: 0
		});
	},

  changeProfPic: function(imageUrl) {
    check(imageUrl, String);

    Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.picture': imageUrl } } );
  },

  changeShowBg: function(showId, imageUrl) {
    check(showId, String);
    check(imageUrl, String);
    
    Shows.update( { _id:  showId }, { $set: { 'image': imageUrl } }  );
  }
});

//directive for uploading audio
Slingshot.createDirective('audioUpload', Slingshot.S3Storage, {
  bucket: 'showstream',

  acl: 'public-read',

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = 'Please login before posting files';
      throw new Meteor.Error('Login Required', message);
    }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's username.
    var artist = Meteor.user();
    return artist.username + '/shows/audio/' + file.name;
  }
});

//directive for uploading the show picture
Slingshot.createDirective('showImgUpload', Slingshot.S3Storage, {
  bucket: 'showstream',

  acl: 'public-read',

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = 'Please login before posting files';
      throw new Meteor.Error('Login Required', message);
    }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's username.
    var artist = Meteor.user();
    return artist.username + '/shows/images/' + file.name;
  }
});

//directive for uploading the users profile picture
Slingshot.createDirective('profPicUpload', Slingshot.S3Storage, {
  bucket: 'showstream',

  acl: 'public-read',

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = 'Please login before posting files';
      throw new Meteor.Error('Login Required', message);
    }

    return true;
  },

  key: function (file) {
    //Store file into a directory by the user's username.
    return Meteor.user().username + '/profile/images/' + file.name;
  }
});