var db = require("../db");

module.exports = {
	getData : (req, res) => {
		db.Activity.findAll({
		}).then(data => res.json(data));
	},

	removeData: (req, res) => {
		db.Activity.findById(req.params.activityId)
			.then((user) => 
				user.destroy()
					.then(()=>
						res.json({})));
	},
    
	addData: (req, res) => {
		db.Activity.create(req.body).then((obj) => 
			res.json({ id: obj.id }));
	},
    
	updateData: (req, res) => {
		db.Activity.findById(req.params.activityId)
			.then((contact) => 
				contact.update(req.body))
			.then(() => 
				res.json({}));
	}
};