import {JetView} from "webix-jet";
import {contacts_collection} from "models/contactsCollection";
import {company_collection} from "models/companyCollection";
import AddCompanyFormPopupView from "views/addCompanyPopupView";

export default class Contacts extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		var contactsList = {
			rows: [
				{view: "toolbar",elements: [
					{view:"label",label: "Companies"}
				]},
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
					localId: "contacts-list",
					select: true,
					width: 280,
					css: "contacts_list",
					editable:true,
					editor:"text",
					template:(obj) => {
						return (
							`<span class='delete_button'>×</span>
							<span class="list-information">${obj.Company}</span>`
						);
					},
					onClick: {
						"delete_button":(e,id) => {
							webix.confirm({
								text: "Do you still want to delete this company?",
								callback: function(result) {
									if(result) {
										company_collection.remove(id); 
										return false;
									}
								}
							});
						}
        
					},
					on: {
						"onAfterSelect": (id) => {	
							this.setParam("id", id, true);	
							this.$$("contacts-datatable").sync(contacts_collection, () => {
								this.$$("contacts-datatable").filter((obj) => {
									return obj.CompanyID == this.$$("contacts-list").getSelectedItem().id;
								});
							});
						},
					},
				},
				{ 
					view: "button",
					localId:"add_button",
					type:"iconButton",
					icon: "plus",
					label:_("Add company"),
					width: 270,
					css: "add_company",
					click: (id) => {
						this._jetPopup.showWindow(id);
					} 
				}
			]
		};

		var contactsDataTable = {
			view: "datatable", 
			localId: "contacts-datatable",
			select: true,
			editable:true,
			columns: [
				{id: "FirstName",header: "First Name",editor: "text"},
				{id: "LastName",header: "Last Name",editor:"text"},
				{id: "Phone",header: "Phone",editor:"text"},
			],
			on: {
				"onAfterSelect": (id) => {	
					this.show(`contactsInformation?id=${id}`);
				},
			},
		};
         
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
		this._jetPopup = this.ui(AddCompanyFormPopupView);
		this.$$("contacts-datatable").sync(contacts_collection);
		this.getContactsList().sync(company_collection);
		this.on(this.app,"onDataDelete",() => this.$$("contacts-datatable").select(contacts_collection.getFirstId()));
		contacts_collection.data.attachEvent("onIdChange", (oldId,newId) => {
			this.$$("contacts-datatable").select(newId);
		});
	}
}