export var contacts_collection = new webix.DataCollection({
	url: "http://localhost:3001/contacts/",
	save: "rest->http://localhost:3001/contacts/",
	scheme:{
		$init: function(obj) { 
			obj.value = obj.FirstName + " "  + obj.LastName;
		},
	},
});