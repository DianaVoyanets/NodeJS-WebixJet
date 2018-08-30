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
				{id: "Address",header: ["Address",{content:"serverFilter"}],editor:"text",sort:"server"},
				{id: "Birthday",header: "Date of birthday"},
				{id: "Company",header: "Company",editor:"text",sort:"server"},
				{id: "Email",header: ["Email",{content:"serverFilter"}],editor: "text",sort:"server"},
				{id: "FirstName",header: "First Name",editor: "text",sort:"server"},
				{id: "LastName",header: "Last Name",editor:"text",sort:"server"},
				{id: "Phone",header: "Phone",editor:"text",sort:"server"},
				{id: "Skype",header: "Skype",editor:"text",sort:"server"},
				{id: "Website",header: "Website",fillspace:true,editor:"text",sort:"server"},
				{id:"trash-icon", header: "",template: "{common.trashIcon()}"}
			],
			onClick: {
				"fa-trash": function(e, id) {
					webix.confirm({
						text:"Do you still want to remove field?",
						callback: function(result) {
							if(result) {
								contacts_collection.remove(id);
								return false;
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