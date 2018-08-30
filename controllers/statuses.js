var db = require("../db");

module.exports = {
	getData : (req, res) => {
		db.Statuses.findAll()
			.then(data => res.json(data));
	},

	removeData: (req, res) => {
		db.Statuses.findById(req.params.statusId)
			.then((user) => 
				user.destroy()
					.then(()=>
						res.json({})));
	},
    
	addData: (req, res) => {
		db.Statuses.create(req.body).then((obj) => 
			res.json({ id: obj.id }));
	},
    
	updateData: (req, res) => {
		db.Statuses.findById(req.params.statusId)
			.then((contact) => 
				contact.update(req.body))
			.then(() => 
				res.json({}));
	}
};