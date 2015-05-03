Meteor.methods({
	createShow: function(artistName, s3url, venueName, showDate, price) {
		check(artistName, String);
		check(s3url, String);
		check(venueName, String);
		check(showDate, String);
		check(price, String);

		Shows.insert({
			artist: artistName,
			venue: venueName,
			date: showDate,
			price: price,
			file: s3url,
			plays: 0,
			score: 0
		});
	}
});

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
    return artist.username + '/audio/' + file.name;
  }
});