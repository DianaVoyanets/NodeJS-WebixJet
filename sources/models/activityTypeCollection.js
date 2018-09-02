export var activity_type_collection = new webix.DataCollection({
	url: "http://localhost:3001/activitytypes/",
	save: "rest->http://localhost:3001/activitytypes/",
	scheme: {
		$init(obj) {
			obj.value = obj.Value;
		}
	}
});