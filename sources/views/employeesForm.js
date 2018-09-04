import {JetView} from "webix-jet";
import {employeesCollection} from "models/employeesCollection";
import {statusCollection} from "models/statusCollection";
import {companyCollection} from "models/companyCollection";

export default class employeesForm extends JetView {
	config() {
		
		var toolbar = {
			view: "toolbar",
			localId:"toolbar",
			cols: [
				{view: "label",localId: "addLabel",label: "Add employee"}
			]
		};

		var employeesForm = {
			view: "form",
			localId: "employeesForm",
			cols: [
				{ rows: [
					{view:"text",label:"First name",name:"FirstName",invalidMessage:"First Name can not be empty",required:true},
					{view:"text",label:"Last name",name:"LastName",invalidMessage:"Last Name can not be empty",required:true},
					{view:"combo",label:"Status",name:"StatusID",options: { body:{template:"#Value#",data:statusCollection}}},
					{view:"text",label:"Job",name:"Job"},
					{view:"combo",label:"Company",name:"CompanyID",options: { body: {template:"#Company#",data:companyCollection}},required:true,invalidMessage:"Company can not be empty"},
					{view:"text",label:"Website",name:"Website"},
					{view:"text",label:"Address",name:"Address"},
					{view:"text",label:"Email",name:"Email",placeholder:"someone@example.com",required:true},
					{view:"text",label:"Skype",name:"Skype"},
					{view:"text",label:"Phone",name:"Phone",placeholder:"375-25-1234567", pattern:{ mask:"###-## #######", allow:/[0-9]/g}},
					{view:"spacer"},
					{ cols: [
						{ view: "button",value: "Cancel",click:() => {
							this.$$("employeesForm").hide();
							this.$$("toolbar").hide();
						}},
						{ view: "button",localId:"addSaveButton",value: "Add",
							click:() => {
								this.saveDate();
							}
						}
					]},
				]}],
			rules: {
				"FirstName": webix.rules.isNotEmpty,
				"LastName": webix.rules.isNotEmpty,
				"Email": webix.rules.isEmail,
			},
		};

		var ui = {
			rows: [
				toolbar,
				employeesForm,
				{view:"spacer"}
			]
		};
		return ui;
	}

	getEmployeesForm() {
		return this.$$("employeesForm");
	}
        
	saveDate() {
		if (this.getEmployeesForm().validate()) {
			employeesCollection.add(this.getEmployeesForm().getValues());    
			this.show("employeesInformation?id=1");
		}
	}
}
