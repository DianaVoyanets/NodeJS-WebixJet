import {JetView} from "webix-jet";
import {contacts_collection} from "models/contactsCollection";
import {company_collection} from "models/companyCollection";
import FormPopupView from "views/employeesEditForm";

export default class ContactsDataTable extends JetView{
	config() {
		return {
			view: "datatable",
			localId: "contactsDatatable",
			columns: [
				{id: "FirstName",header: ["First Name",{content:"serverFilter"}],sort:"server"},
				{id: "LastName",header: ["Last Name",{content:"serverFilter"}],sort:"server"},
				{id: "Address",header: ["Address",{content:"serverFilter"}],sort:"server"},
				{id: "Email",header: ["Email",{content:"serverFilter"}],sort:"server",width:160},
				{id: "Phone",header: ["Phone",{content:"serverFilter"}],sort:"server",width:140},
				{id: "Skype",header: ["Skype",{content:"serverFilter"}],sort:"server",width:120},
				{id: "Website",header: ["Website",{content:"serverFilter"}],fillspace:true,sort:"server"},
				{id: "CompanyID",header: "Company",options: company_collection},
				{id:"pencil-icon", header:"",template: "{common.editIcon()}",width:50},
				{id: "trash-icon", header: "",template: "{common.trashIcon()}",width:50},
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
				},
				"fa-pencil": (e,id) => {
					this._jetPopup.showWindow(id);
				}
			},
			url: "http://localhost:3001/contacts/",
		};
	}
	init() {
		this._jetPopup = this.ui(FormPopupView);
		this.$$("contactsDatatable").sync(contacts_collection);
	}
}