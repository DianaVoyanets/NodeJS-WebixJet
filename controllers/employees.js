var db = require("../db");

module.exports = {
	getData: (req, res) =>  {
		var limit = (req.query.count || 20) * 1;
		var offset = (req.query.start || 0) * 1;
        
		var where = req.query.filter || {};

		for (var filter in where) {
			var filterValue = where[filter];
            
			if (typeof filterValue === "string") {
				var correctValue = filterValue.trim();

				if (correctValue.length > 0) {
					where[filter] = { $like: "%" + correctValue + "%" };
					continue;
				}
			} 
            
			delete where[filter];
		}
        
		console.log(where);

		var order = req.query.sort ? Object.entries(req.query.sort) : [];
        
		var count = db.Employees.findAndCountAll({ where });
        
		var page = db.Employees.findAll({
			where, limit, offset, order
		});

		Promise
			.all([count, page])
			.then(data => res.json({
				pos: offset, 
				total_count: data[0].count, 
				data: data[1]
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