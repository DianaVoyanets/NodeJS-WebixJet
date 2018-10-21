import {JetView} from "webix-jet";
import {employeesCollection} from "models/employeesCollection";
import {companyCollection} from "models/companyCollection";
import FormPopupView from "views/employeesEditForm";

export default class employeesDatatable extends JetView{
	config() {
		return {
			view: "datatable",
			localId: "employeesDatatable",
			editable: "true",
			columns: [
				{id: "id"},
				{id: "FirstName",header: ["First Name",{content:"serverFilter"}],width:160,sort:"server",editor: "text"},
				{id: "LastName",header: ["Last Name",{content:"serverFilter"}],width:160,sort:"server",editor: "text"},
				{id: "Address",header: ["Address",{content:"serverFilter"}],width: 160,sort:"server",editor: "text"},
				{id: "Email",header: ["Email",{content:"serverFilter"}],width:160,sort:"server",editor: "text"},
				{id: "Phone",header: ["Phone",{content:"serverFilter"}],sort:"server",width:160,editor: "text"},
				{id: "Skype",header: ["Skype",{content:"serverFilter"}],sort:"server",width:160,editor: "text"},
				{id: "Website",header: ["Website",{content:"serverFilter"}],sort:"server",width: 160,editor: "text"},
				{id: "CompanyID",header: ["Company",{content:"serverSelectFilter"}], options:companyCollection,width: 160},
				{id: "pencil-icon", header:"",template: "{common.editIcon()}",width:50},
				{id: "trash-icon", header: "",template: "{common.trashIcon()}",width:50},
			],
			rules: {
				"FirstName": webix.rules.isNotEmpty,
				"LastName": webix.rules.isNotEmpty,
				"Address": webix.rules.isNotEmpty,
				"Email": webix.rules.isEmail,
				"Skype": webix.rules.isNotEmpty,
				"Website": webix.rules.isNotEmpty
			},
			onClick: {
				"fa-trash": function(e, id) {
					webix.confirm({
						text:"Do you still want to remove field?",
						callback: (result) => {
							if(result) {
								employeesCollection.remove(id);
								return false;
							}
						}
					});
				},
				"fa-pencil": (e,id) => {
					this._jetPopup.showWindow(id);
				}
			},
			url: "http://localhost:3001/employeesDynamicData",
			save: "rest->http://localhost:3001/employees/"
		};
	}
    
	init() {
		this._jetPopup = this.ui(FormPopupView);
	}
}
