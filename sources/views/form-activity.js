import {JetView} from "webix-jet";
import {activity_collection} from "models/activity-collection";
import {activity_type_collection} from "models/activityType-collection";
import {contacts_collection} from "models/contacts-collection";

export default class PopupView extends JetView {
	config() {
		return {
			view:"window", 
			move:true,
			localId: "form-popup",
			head:"#value#",
			position:"center",
			width: 500,
			body:{
				view:"form",
				localId: "form",
				elements:[
					{ view:"textarea", label:"Details", name:"Details",invalidMessage:"Type can not be empty"},
					{ view:"combo", label:"TypeID", name:"TypeID",options: { body:{template:"#Value#",data:activity_type_collection}},invalidMessage:"Type can not be empty" },
					{ view:"combo", label:"Contacts", name:"ContactID",options: { body:{template:"#FirstName#"+ " " + "#LastName#",data:contacts_collection}},invalidMessage:"Contact can not be empty"},
					{ margin:5, cols:[
						{ view:"datepicker", label:"Data",name:"DueDate",format:"%d-%m-%Y"},
						//{ view:"datepicker", label:"Time",type:"time",name: "Time"}
					]},
					{view: "checkbox",label:"Completed",name:"State",css:"checkboxLabel"},
					{ cols: [
						{view:"spacer"},
						{view:"button",localId:"add_save_button",width: 110,
							click: () => {
								if(!this.getValues().id) {
									this.add();
								}
								else this.update();
							}
						},
						{view:"button",value: "Cancel",width: 110,click:()=> this.$$("form-popup").hide()},
					]}
				],
				rules: {
					"Details": webix.rules.isNotEmpty,
					"TypeID":webix.rules.isNotEmpty,
					"ContactID":webix.rules.isNotEmpty,
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
    
	showWindow(id) {
		if (id) {
			let values = activity_collection.getItem(id);
			this.getForm().setValues(values);
		} else {
			this.getForm().clear();	
		}
		this.getRoot().show();
		this.$$("add_save_button").setValue(id ? "Save" : "Add");
		this.$$("form-popup").getHead().setHTML(id ? "Edit activity" : "Add activity");
	}
    
	add() {
		if (this.getForm().validate()) {
			activity_collection.add(this.getValues());
			this.getForm().hide();
		}
	}
    
	update() {
		if (this.getForm().validate()) {
			activity_collection.updateItem(this.getValues().id,this.getValues());
			this.getForm().hide();
		}
	}
}

