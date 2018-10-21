export var statusCollection = new webix.DataCollection({
	url: "http://localhost:3001/statuses",
	save: "rest->http://localhost:3001/statuses/"
});