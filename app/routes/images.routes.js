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
		var filePath  = '/images/' + generateImageUrlExtension();
		fs.rename(req.files.photo.path, filePath, 	function(error) {
            if(error) {
				return;
			}
            res.send({
				status: success;
            });
		});
	});
	
	
	function generateImageUrlExtension() {
		var imageUrl = "";
		for(var i = 0; i < 100; i++) {
			imageUrl += String.fromCharCode(0x0040 + Math.random() * (0x005B - 0x0041)+1);
		}
		return imageUrl;
	}
};