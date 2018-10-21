export var employeesCollection = new webix.DataCollection({
	url: "http://localhost:3001/employees",
	save: "rest->http://localhost:3001/employees/",
	scheme:{
		$init: function(obj) { 
			obj.value = obj.FirstName + " "  + obj.LastName;
		},
	},
});