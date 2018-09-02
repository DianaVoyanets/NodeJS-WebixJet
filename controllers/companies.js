var db = require("../db");

module.exports = {
	getData : (req, res) => {
		db.Company.findAll()
			.then(data => res.json(data));
	},

	removeData: (req, res) => {
		db.Company.findById(req.params.companyId)
			.then((user) => 
				user.destroy()
					.then(()=>
						res.json({})));
	},
    
	addData: (req, res) => {
		db.Company.create(req.body).then((obj) => 
			res.json({ id: obj.id }));
	},
    
	updateData: (req, res) => {
		db.Company.findById(req.params.companyId)
			.then((contact) => 
				contact.update(req.body))
			.then(() => 
				res.json({}));
	}
    
};