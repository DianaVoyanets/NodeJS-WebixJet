import {JetView} from "webix-jet";
import {contacts_collection} from "models/contacts-collection";
import {company_collection} from "models/company-collection";

export default class Contacts extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		var contactsList = {
			rows: [
				{view:"search", localId:"search_contacts",placeholder: "search...",
					on: {
						"onTimedKeyPress":function() {
							var value = this.getValue().toLowerCase();
							this.$scope.$$("contacts-list").filter((obj) => {
 								return obj.Company.toLowerCase().indexOf(value)==0;
							});
						}
					}},
				{	
					view: "list",
					id: "contacts-list",
					select: true,
					css: "contacts_list",
					template:(obj) => {
						return (
							`<span class="list-information">${obj.Company}</span>`
						);
					},
					on: {
						"onAfterSelect": (id) => {	
								this.setParam("id", id, true);	
						},
					},
				},
				{ 
					view: "button",
					id:"add_button",
					type:"iconButton",
					icon: "plus",
					label:_("Add employees"),
					css: "add_contact",
					width: 350,
					click: () => {
						this.app.callEvent("onClickContactsForm", []);
						this.show("contactsForm");
					} 
				}]
		};

		var contactsDataTable = {
			view: "datatable", 
			localId: "contacts-datatable",
			select: true,
			columns: [
				{id: "FirstName",header: "First Name"},
				{id: "LastName",header: "Last Name"},
				{id: "Phone",header: "Phone"}
			],
			on: {
				"onAfterSelect": () => {	
					var id = this.$$("contacts-datatable").getSelectedItem().id;
					this.show(`contactsInformation?id=${id}`);
				},
			},
		}
         
		var ui = {
			rows:[{
				cols: [
					contactsList,
					contactsDataTable,
					{$subview: true},        
				]}
			]
		};
		return ui;  
	}
    
	getContactsList() {
		return this.$$("contacts-list");
	}

	init() {
		this.$$("contacts-datatable").sync(contacts_collection);
		this.getContactsList().sync(company_collection);
		this.on(this.app,"onDataDelete",() => this.$$("contacts-datatable").select(contacts_collection.getFirstId()));
		contacts_collection.data.attachEvent("onIdChange", (oldId,newId) => {
			this.$$("contacts-datatable").select(newId);
		});

	}

	urlChange() {
		contacts_collection.waitData.then(()=>{
			this.$$("contacts-datatable").sync(contacts_collection, () => {
				this.$$("contacts-datatable").filter((obj) => {
					return obj.Company == this.$$("contacts-list").getSelectedItem().id;
				});
			})
			// var id = this.getParam("id") || contacts_collection.getFirstId();
			// // if (contacts_collection.exists(id)) {
			// // 	this.getContactsList().select(id);
			// // }
			// // else {
			// // 	this.getContactsList().select(this.getContactsList().getFirstId());
			// // 	this.getContactsList().showItem(id);
			// // }
		});
	}
}