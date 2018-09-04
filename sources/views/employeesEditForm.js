import {JetView} from "webix-jet";
import { employeesCollection } from "../models/employeesCollection";
import {companyCollection} from "models/companyCollection";

export default class FormPopupView extends JetView {
	config() {
		return {
			view:"window", 
			move:true,
			localId: "formPopup",
			head:"Edit employees datatable",
			position:"center",
			height: 800,
			body:{
				view:"form",
				localId: "form",
				rows: [
					{ cols:[
						{
							rows: [
								{view:"text",label:"FirstName", name:"FirstName",width:250},
								{view:"text",label:"LastName", name:"LastName"},
								{view:"text",label:"Address", name:"Address"},
								{view:"text",label:"Email", name:"Email"},
							],
						},
						{
							rows: [
								{view:"text",label:"Phone", name:"Phone",width: 250},
								{view:"text",label:"Skype", name:"Skype"},
								{view:"text",label:"Website", name:"Website"},
								{view:"combo",label:"Company", name:"CompanyID",options: { body: {template:"#Company#",data:companyCollection}}},
								{view: "spacer"}
							]
						}
					],
					},
					{ margin: 10,cols: [
						{ view: "spacer"},
						{ view: "button",value: "Save",width: 120,click:() => this.saveData()},
						{ view: "button",value: "Cancel",width: 120,click: ()=> this.$$("formPopup").hide()},
					]}
				]
			}
		};
	}
	
	getForm() {
		return this.$$("form");
	}
	
	showWindow(id) {
		let values = employeesCollection.getItem(id);
		this.getForm().setValues(values);
		this.getRoot().show();
	}
    
	saveData() {
		var values = this.getForm().getValues();
		if (this.getForm().validate()) {
			employeesCollection.updateItem(values.id, values);
			this.getForm().hide();
		}
	}
}