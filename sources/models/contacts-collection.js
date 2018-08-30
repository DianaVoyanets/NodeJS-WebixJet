export var contacts_collection = new webix.DataCollection({
	url: "http://localhost:3006/contacts/",
	save: "rest->http://localhost:3006/contacts/",
	scheme:{
		$init: function(obj) { 
			obj.value = obj.FirstName + " "  + obj.LastName;
		},
	},
});