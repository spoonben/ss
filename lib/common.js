Slingshot.fileRestrictions('audioUpload', {
	allowedFileTypes: ['audio/mp3'],
	maxSize: 50 * 1024 * 1024
});

Slingshot.fileRestrictions('showImgUpload', {
	allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif', '.jpg'],
	maxSize: .5 * 1024 * 1024
});

Slingshot.fileRestrictions('profPicUpload', {
	allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif', '.jpg'],
	maxSize: .5 * 1024 * 1024
});