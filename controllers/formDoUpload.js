var formidable = require("formidable");
var db = require("../db");


module.exports = {
	doUpload : function(req, res){
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			db.File.create({ 
				name: files.upload.name,
				path: files.upload.path
			}).then(saved => res.json({value: saved.name }));
		});
	}
};