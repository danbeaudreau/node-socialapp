var Image         	= require('../models/image');

module.exports = function(router) {

    router.get('/getImageInfo', function(req,res){
      var imageQuery = Image.find({username : req.param('id')});
      imageQuery.exec(function(err, imageInfo){
        if(err){
          return;
        }
        res.json(imageInfo);
      });
    });

	function generateImageUrlExtension() {
		var imageUrl = "";
		for(int i = 0; i < 8; i++) {
			imageUrl += String.fromCharCode(0x0041 + Math.random() * 26);
		}
		return imageUrl;
	}
};