import {JetView} from "webix-jet";
import {activity_collection} from "models/activityCollection";
import {activity_type_collection} from "models/activityTypeCollection";
import {contacts_collection} from "models/contactsCollection";

export default class PopupView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view:"window", 
			move:true,
			localId: "form-popup",
			head:"#value#",
			position:"center",
			width: 700,
			body:{
				view:"form",
				localId: "form",
				width: 450,
				elements:[
					{ view:"textarea",labelWidth:100,label:_("Details"), name:"Details",invalidMessage:"Type can not be empty",required:true},
					{ view:"combo", labelWidth:100,label:_("Type"), name:"TypeID",options: { body:{template:"#Value#",data:activity_type_collection}},invalidMessage:"Type can not be empty",required:true},
					{ localId: "contact",labelWidth:100,view:"combo", label:_("Contacts"), name:"ContactID",options: { body:{template:"#FirstName#"+ " " + "#LastName#",data:contacts_collection}},invalidMessage:"Contact can not be empty",required:true},
					{ margin:5, cols:[
						//{ view:"datepicker", labelWidth:100,label:_("Data"),name:"DueDate",format:"%d-%m-%Y"},
						//{ view:"datepicker", label:"Time",type:"time",name: "Time"}
					]},
					{ view: "checkbox",labelWidth:104,label:_("CompletedForm"),name:"State",css:"checkboxLabel"},
					{ cols: [
						{ view:"spacer"},
						{ view:"button",localId:"add_save_button",width: 110,
							click: () => {
								this.saveDate();
							}
						},
						{ view:"button",value: _("Cancel"),width: 110,click:()=> this.getForm().hide()},
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
    
	saveDate() {
		var values = this.$$("form").getValues();
		if (this.getForm().validate()) {
			if (!this.getValues().id) {
				activity_collection.add(values);
			}
			else {
				activity_collection.updateItem(values.id, values);
			}
			this.hideWindow();
		}
	}
    
	showWindow(id) {
		const _ = this.app.getService("locale")._;
		if (id) {
			let values = activity_collection.getItem(id);
			this.getForm().setValues(values);
		} else {
			this.getForm().clear();
		}
		this.getRoot().show();
		this.$$("add_save_button").setValue(id ? _("Save") : _("Add"));
		this.$$("form-popup").getHead().setHTML(id ? _("Edit activity") : _("Add activity"));
	}
    
	hideWindow() {
		this.getForm().hide();
		this.getForm().clear();
		this.getForm().clearValidation();
	}
}

