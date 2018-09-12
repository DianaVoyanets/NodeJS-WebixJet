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
				{rows: [
					{view:"text",label:"First name",labelWidth:100,name:"FirstName",invalidMessage:"First Name can not be empty",required:true},
					{view:"text",label:"Last name",labelWidth:100,name:"LastName",invalidMessage:"Last Name can not be empty",required:true},
					{view:"combo",label:"Status",labelWidth:100,name:"StatusID",options: { body:{template:"#Value#",data:statusCollection}}},
					{view:"text",label:"Job",labelWidth:100,name:"Job"},
					{view:"combo",label:"Company",labelWidth:100,name:"CompanyID",options: { body: {template:"#Company#",data:companyCollection}},required:true,invalidMessage:"Company can not be empty"},
					{view:"text",label:"Website",labelWidth:100,name:"Website"},
					{view:"text",label:"Address",labelWidth:100,name:"Address"},
					{view:"text",label:"Email",labelWidth:100,name:"Email",placeholder:"someone@example.com",required:true},
					{view:"text",label:"Skype",labelWidth:100,name:"Skype"},
					{view:"text",label:"Phone",labelWidth:100,name:"Phone",placeholder:"375-25-1234567", pattern:{ mask:"###-## #######", allow:/[0-9]/g}},
					{view:"spacer"},
					{ cols: [
						{ view: "button",localId:"addSaveButton",value: "Add",
							click:() => {
								this.saveDate();
							}
						},
						{ view: "button",value: "Cancel",click:() => {
							this.app.show("/top/employeesList");
							if (this.$$("employeesForm").isVisible) {
								this.$$("employeesForm").hide();
								this.$$("toolbar").hide();
							}
						}},
					]},
				]}],
			rules: {
				"FirstName": webix.rules.isNotEmpty,
				"LastName": webix.rules.isNotEmpty,
				"Email": webix.rules.isEmail,
				"CompanyID": webix.rules.isNotEmpty
			},
		};

		return {
			rows: [
				toolbar,
				employeesForm,
				{view:"spacer"}
			]
		};
	}

	init() {
		this.on(this.app,"onClickemployeesForm",()=> {
			this.$$("employeesForm").show();
		});
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
