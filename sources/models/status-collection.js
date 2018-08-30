export var status_collection = new webix.DataCollection({
	url: "http://localhost:3006/statuses/",
	save: "rest->http://localhost:3006/statuses/"
});