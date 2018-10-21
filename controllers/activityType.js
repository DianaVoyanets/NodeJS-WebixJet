var db = require("../db");

module.exports = {
	getData : (req, res) => {
		db.ActivityType.findAll()
			.then(data => res.json(data));
	},

	removeData: (req, res) => {
		db.ActivityType.findById(req.params.typeId)
			.then((activityType) => 
				activityType.destroy()
					.then(()=>
						res.json({})));
	},
    
	addData: (req, res) => {
		db.ActivityType.create(req.body).then((obj) => 
			res.json({ id: obj.id }));
	},
    
	updateData: (req, res) => {
		db.ActivityType.findById(req.params.typeId)
			.then((activitytype) => 
				activitytype.update(req.body))
			.then(() => 
				res.json({}));
	}
};