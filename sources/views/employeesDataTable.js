import {JetView} from "webix-jet";
import {contacts_collection} from "models/contacts-collection";

export default class ContactsDataTable extends JetView{
	config() {
		return {
			view: "datatable",
			localId: "contactsDatatable",
			editable:true,
			url: "http://localhost:3006/contacts/",
			columns: [
				{id: "Address",header: ["Address",{content:"serverFilter"}],editor:"text",sort:"server",width: 150},
				{id: "Birthday",header: "Date of birthday",width: 150},
				{id: "Email",header: ["Email",{content:"serverFilter"}],editor: "text",sort:"server",width: 170},
				{id: "FirstName",header: ["First Name",{content:"serverFilter"}],editor:"text",sort:"server",width: 150},
				{id: "LastName",header: ["Last Name",{content:"serverFilter"}],editor:"text",sort:"server",width: 150},
				{id: "Phone",header: ["Phone",{content:"serverFilter"}],editor:"text",sort:"server",width: 130},
				{id: "Skype",header: ["Skype",{content:"serverFilter"}],editor:"text",sort:"server",width: 130},
				{id: "Website",header: ["Website",{content:"serverFilter"}],fillspace:true,editor:"text",sort:"server",width: 130},
				{id: "trash-icon", header: "",template: "{common.trashIcon()}"}
			],
			onClick: {
				"fa-trash": function(e, id) {
					webix.confirm({
						text:"Do you still want to remove field?",
						callback: function(result) {
							if(result) {
								contacts_collection.remove(id);
								return false
							}
						}
					});
				}
			}
		};
	}
	init() {
		this.$$("contactsDatatable").sync(contacts_collection);
	}
}