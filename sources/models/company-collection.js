export var company_collection = new webix.DataCollection({
	url: "http://localhost:3006/companies/",
	save: "rest->http://localhost:3006/companies/",
});