var db = require("../db");

module.exports = {
	getData: (req, res) =>  {
		var limit = (req.query.count || 100)*1;
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
        
		var order = [];
		var querySort = req.query.sort;

		if (querySort) {
    
			if (querySort.FirstName) {
				order.push(["FirstName", querySort.FirstName]);
			}    

			if (querySort.LastName) {
				order.push(["LastName", querySort.LastName]);
			}    
            
			if (querySort.Address) {
				order.push(["Address", querySort.Address]);
			}    

			if (querySort.Email) {
				order.push(["Email", querySort.Email]);
			}    

			if (querySort.Phone) {
				order.push(["Phone", querySort.Phone]);
			}    

			if (querySort.Skype) {
				order.push(["Skype", querySort.Skype]);
			}  
              
			if (querySort.Website) {
				order.push(["Website", querySort.Website]);
			}   
		}

		var count = db.Employees.findAndCountAll({ where });
		var page = db.Employees.findAll({
			where, limit, offset, order
		});
        
		Promise.all([count, page]).then(data => res.json({
			pos:offset, total_count:data[0], data:data[1] 
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