var db = require("../db");
var formidable = require("formidable");

module.exports = {
	getData : (req, res) => {
		db.File.findAll()
			.then(data => res.json(data));
	},

	removeData: (req, res) => {
		db.File.findById(req.params.companyId)
			.then((user) => 
				user.destroy()
					.then(()=>
						res.json({})));
	},

	addData: (req, res) => {
		db.File.create(req.body).then((obj) => 
			res.json({ id: obj.id }));
	},

	// doUpload : function(req, res){
	// 	var form = new formidable.IncomingForm();
	// 	form.parse(req, function(err, fields, files) {
	// 		db.File.create({ 
	// 			ContactID: 1,
	// 			name: files.upload.name,
	// 			path: files.upload.path
	// 		}).then(saved => res.json({ value: saved.name }));
	// 	});
	// },
    
	updateData: (req, res) => {
		db.File.findById(req.params.companyId)
			.then((contact) => 
				contact.update(req.body))
			.then(() => 
				res.json({}));
	}
    
};