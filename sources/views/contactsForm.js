import {JetView} from "webix-jet";
import {contacts_collection} from "models/contactsCollection";
import {status_collection} from "models/statusCollection";
import {company_collection} from "models/companyCollection";

export default class ContactsForm extends JetView {
	config() {

		const _ = this.app.getService("locale")._;
        
		var contactsForm = {
			view: "form",
			localId: "contacts_form",
			cols: [
				{ rows: [
					{ view:"text",label:_("First name"),name:"FirstName",invalidMessage:"First Name can not be empty",required:true},
					{ view:"text",label:_("Last name"),name:"LastName",invalidMessage:"Last Name can not be empty",required:true},
					//{view:"datepicker",label:_("Joining date"),name:"StartDate"},
					{ view:"combo",label:_("Status"),name:"StatusID",options: { body:{template:"#Value#",data:status_collection}}},
					{ view:"text",label:_("Job"),name:"Job"},
					{ view:"combo",label:_("Company"),name:"CompanyID",options: { body: {template:"#Company#",data:company_collection}},required:true},
					{ view:"text",label:_("Website"),name:"Website"},
					{ view:"text",label:_("Address"),name:"Address"},
					{ view:"text",label:_("Email"),name:"Email",placeholder:"someone@example.com:",required:true},
					{ view:"text",label:_("Skype"),name:"Skype"},
					{ view:"text",label:_("Phone"),name:"Phone",placeholder:"375-25-1234567", pattern:{ mask:"###-## #######", allow:/[0-9]/g}},
					{ view:"spacer"},
					{ cols: [
						{ view: "button",value: _("Cancel"),click:() => {
							this.$$("contacts_form").hide();
							this.$$("mytoolbar").hide();
						}},
						{ view: "button",localId:"add_save_button",value: "Add",
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
				//"Company": webix.rules.isNotEmpty
			},
		};
        
		var toolBar = {
			view: "toolbar",
			localId:"mytoolbar",
			cols: [
				{view: "label",localId: "add_label",label: "Add employee"}
			]
		};

		var ui = {
			rows: [
				toolBar,
				contactsForm,
				{view:"spacer"}
			]
		};
		return ui;
	}

	getContactsForm() {
		return this.$$("contacts_form");
	}
        
	saveDate() {
		if (this.getContactsForm().validate()) {
			contacts_collection.add(this.getContactsForm().getValues());    
			this.show("contactsInformation?id=1");
		}
	}
}
