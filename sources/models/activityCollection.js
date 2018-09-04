export var activityCollection = new webix.DataCollection({
	url: "http://localhost:3001/activity",
	save: "rest->http://localhost:3001/activity/",
});
