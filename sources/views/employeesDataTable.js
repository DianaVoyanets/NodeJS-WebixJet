import {JetView} from "webix-jet";
import {employeesCollection} from "models/employeesCollection";
import {companyCollection} from "models/companyCollection";
import FormPopupView from "views/employeesEditForm";

export default class employeesDatatable extends JetView{
	config() {
		return {
			view: "datatable",
			localId: "employeesDatatable",
			columns: [
				{id: "FirstName",header: ["First Name",{content:"serverFilter"}],width:160,sort:"server"},
				{id: "LastName",header: ["Last Name",{content:"serverFilter"}],width:160,sort:"server"},
				{id: "Address",header: ["Address",{content:"serverFilter"}],width: 160,sort:"server"},
				{id: "Email",header: ["Email",{content:"serverFilter"}],width:160,sort:"server",width:160},
				{id: "Phone",header: ["Phone",{content:"serverFilter"}],sort:"server",width:160},
				{id: "Skype",header: ["Skype",{content:"serverFilter"}],sort:"server",width:160},
				{id: "Website",header: ["Website",{content:"serverFilter"}],sort:"server",width: 160},
				{id: "CompanyID",header: "Company",options: companyCollection,width: 160,fillspace:true},
				{id: "pencil-icon", header:"",template: "{common.editIcon()}",width:50},
				{id: "trash-icon", header: "",template: "{common.trashIcon()}",width:50},
			],
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
			url: "http://localhost:3001/employees",
			save: "rest->http://localhost:3001/employees/"
		};
	}
	init() {
		this._jetPopup = this.ui(FormPopupView);
	}
}