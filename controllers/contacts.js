var db = require("../db");

module.exports = {
	getData: (req, res) =>  {
		var limit = (req.query.count || 20)*1;
		var offset = (req.query.start || 0)*1;

		var where = req.query.filter ? { 
			Address: { $like: "%" + req.query.filter.Address + "%" },
			Email: { $like: "%" + req.query.filter.Email + "%" }
            
		} : {};
        
		var order = [];
		var querySort = req.query.sort;

		if (querySort) {
    
			if (querySort.Email) {
				order.push(["Email", querySort.Email]);
			}    

			//if(querySort.)
		}

		var count = db.Contacts.findAndCountAll({ where });
		var page = db.Contacts.findAll({
			where, limit, offset, order
		});
        
		Promise.all([count, page]).then(data => res.json({
			pos:offset, total_count:data[0], data:data[1] 
		}));
	},

	removeData: (req, res) => {
		db.Contacts.findById(req.params.contactId)
			.then((user) => 
				user.destroy())
			.then(() => 
				res.json({}));
	},
    
	addData: (req, res) => {
		db.Contacts.create(req.body)
			.then((obj) => 
				res.json({ id: obj.id })
			);
	},
    
	updateData: (req, res) => {
		db.Contacts.findById(req.params.contactId)
			.then((contact) => 
				contact.update(req.body))
			.then(() => 
				res.json({}));
	}
};