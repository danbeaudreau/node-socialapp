var Image         	= require('../models/image');
var fs 				= require('fs');

module.exports = function(router) {

    router.get('/getImageInfo', function(req, res){
      var imageQuery = Image.find({username : req.param('id')});
      imageQuery.exec(function(err, imageInfo){
        if(err){
          return;
        }
        res.json(imageInfo);
      });
    });
	
	router.post('/postImage', function(req, res){
		if(req.isAuthenticated()){
			var filePath  = '/images/' + generateImageUrlExtension();
			fs.rename(req.files.photo.path, filePath, 	function(error) {
				if(error) {
					return;
				}
				var imageData = {
					username : req.session.passport.user,
					date: new Date(),
					urlExtension: filePath
				}
				Image image = new Image(imageData);
				image.save(function(error, settings) {
				  if(error){
					return;
				  }
				  res.send({
					status: success;
				  });
				});
			});
		}
	});
	
	
	function generateImageUrlExtension() {
		var imageUrl = "";
		for(var i = 0; i < 8; i++) {
			imageUrl += String.fromCharCode(0x0040 + Math.random() * (0x005B - 0x0041)+1);
		}
		return imageUrl;
	}
};