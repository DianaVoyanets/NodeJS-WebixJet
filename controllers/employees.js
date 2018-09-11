var db = require("../db");

module.exports = {
	getData: (req, res) =>  {
		var limit = (req.query.count || 20) * 1;
		var offset = (req.query.start || 0) * 1;
        
		var queryFilter = req.query.filter;
		var where = {};
		
		for (var filter in queryFilter) {
			var filterValue = queryFilter[filter];
            
			if (typeof filterValue === "string") {
				var correctValue = filterValue.trim();

				if (correctValue.length > 0) {
					where[filter] = { $like: "%" + correctValue + "%" };
				}
			}
		} 

		var order = req.query.sort ? Object.entries(req.query.sort) : [];
        	var employeesData = db.Employees.findAndCountAll({ where, limit, offset, order });
		
		Promise
			.resolve(employeesData)
			.then(data => res.json({
				pos: offset, 
				total_count: data.count, 
				data: data.rows
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
