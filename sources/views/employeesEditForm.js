import {JetView} from "webix-jet";
import { contacts_collection } from "../models/contactsCollection";
import {company_collection} from "models/companyCollection";

export default class FormPopupView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view:"window", 
			move:true,
			localId: "form-popup",
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
								{ view:"text",label:"FirstName", name:"FirstName",width:250},
								{ view:"text",label:"LastName", name:"LastName"},
								{ view:"text",label:"Address", name:"Address"},
								{ view:"text",label:"Email", name:"Email"},
							],
						},
						{
							rows: [
								{ view:"text",label:"Phone", name:"Phone",width: 250},
								{ view:"text",label:"Skype", name:"Skype"},
								{ view:"text",label:"Website", name:"Website"},
								{ view:"combo",label:"Company", name:"CompanyID",options: { body: {template:"#Company#",data:company_collection}}},
								{ view: "spacer"}
							]}
					],
					},
					{margin: 10,cols: [
						{view: "spacer"},
						{view: "button",value: "Save",width: 120,click:() => this.saveData()},
						{view: "button",value: "Cancel",width: 120,click: ()=> this.$$("form-popup").hide()},
					]}
					
				]
			}
		};
	}
    
	showWindow(id) {
		let values = contacts_collection.getItem(id);
		this.$$("form").setValues(values);
		this.getRoot().show();
	}
    
	saveData() {
		var values = this.$$("form").getValues();
		if (this.$$("form").validate()) {
			contacts_collection.updateItem(values.id, values);
			this.$$("form").hide();
		}
	}
}