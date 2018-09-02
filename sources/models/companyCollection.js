export var company_collection = new webix.DataCollection({
	url: "http://localhost:3001/companies/",
	save: "rest->http://localhost:3001/companies/",
	scheme: {
		$init: function(obj) {
			obj.value = obj.Company;
		}
	}

});