var db = require("../db");

module.exports = {
	getData: (req, res) =>  {
		var limit = (req.query.count || 20)*1;
		var offset = (req.query.start || 0)*1;

		var where = req.query.filter ? { 
			FirstName: { $like: "%" + req.query.filter.FirstName + "%" },
			LastName: { $like: "%" + req.query.filter.LastName + "%" },
			Address: { $like: "%" + req.query.filter.Address + "%" },
			Email: { $like: "%" + req.query.filter.Email + "%" },
			Phone: { $like: "%" + req.query.filter.Phone + "%" },
			Skype: { $like: "%" + req.query.filter.Skype + "%" },
			Website: { $like: "%" + req.query.filter.Website + "%" },
		} : {};
		
	
		var querySort = req.query.sort;
		var order = [];

		if (querySort) {
			var key = Object.entries(req.query.sort)[0][0];
			if (querySort[key]) {
				order.push([key,querySort[key]]);
			}
		}
		
		var count = db.Employees.findAndCountAll({});

		var page = db.Employees.findAll({
			where,limit,offset,order
		});

		Promise.all([count,page]).then(data => res.json({
			pos:offset, total_count:data[0], data: data[1] 
		}));
	},

	removeData: (req, res) => {
		db.Employees.findById(req.params.employeesId)
			.then((employees) => 
				employees.destroy())
			.then(() => 
				res.json({}));
	},
    
	addData: (req, res) => {
		db.Employees.create(req.body)
			.then((obj) => 
				res.json({ id: obj.id })
			);
	},
    
	updateData: (req, res) => {
		db.Employees.findById(req.params.employeesId)
			.then((employees) => 
				employees.update(req.body))
			.then(() => 
				res.json({}));
	}
};