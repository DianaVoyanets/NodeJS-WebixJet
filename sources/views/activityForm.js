import {JetView} from "webix-jet";
import {activityCollection} from "models/activityCollection";
import {activityTypeCollection} from "models/activityTypeCollection";
import {employeesCollection} from "models/employeesCollection";

export default class PopupView extends JetView {
	config() {
		return {
			view:"window", 
			move:true,
			localId: "formPopup",
			head:"#value#",
			position:"center",
			width: 700,
			body:{
				view:"form",
				localId: "form",
				width: 450,
				elements:[
					{view:"textarea",labelWidth:100,label:"Details", name:"Details",invalidMessage:"Type can not be empty",required:true},
					{view:"combo", labelWidth:100,label:"Type", name:"TypeID",options: { body:{template:"#Value#",data:activityTypeCollection}},invalidMessage:"Type can not be empty",required:true},
					{view:"combo",localId: "contact",labelWidth:100,label:"Employee", name:"ContactID",options: { body:{template:"#FirstName#"+ " " + "#LastName#",data:employeesCollection}},invalidMessage:"Contact can not be empty",required:true},
					{view: "checkbox",label:"Completed",name:"State",css:"checkboxLabel"},
					{ cols: [
						{view:"spacer"},
						{view:"button",localId:"addSaveButton",width: 110,
							click: () => this.saveDate()},
						{view:"button",value: "Cancel",width: 110,click:()=> this.getForm().hide()},
					]}
				],
				rules: {
					"FirstName": webix.rules.isNotEmpty,
					"LastName": webix.rules.isNotEmpty,
					"Email": webix.rules.isEmail,
					"CompanyID": webix.rules.isNotEmpty
				},
				autoheight:true,
				autowidth:true,
			}
		};
	}

	getForm() {
		return this.$$("form");
	}
    
	getValues() {
		return this.getForm().getValues();
	}
    
	saveDate() {
		var values = this.getValues();
		if (this.getForm().validate()) {
			if (!this.getValues().id) {
				activityCollection.add(values);
			}
			else {
				activityCollection.updateItem(values.id, values);
			}
			this.hideWindow();
		}
	}
    
	showWindow(id) {
		if (id) {
			let values = activityCollection.getItem(id);
			this.getForm().setValues(values);
		} else {
			this.getForm().clear();
		}
		this.getRoot().show();
		this.$$("addSaveButton").setValue(id ? "Save" : "Add");
		this.$$("formPopup").getHead().setHTML(id ? "Edit activity" : "Add activity");
	}
    
	hideWindow() {
		this.getForm().hide();
		this.getForm().clear();
		this.getForm().clearValidation();
	}
}

