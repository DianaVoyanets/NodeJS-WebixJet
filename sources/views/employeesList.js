import {JetView} from "webix-jet";
import {employeesCollection} from "models/employeesCollection";
import {companyCollection} from "models/companyCollection";
import {activityCollection} from "models/activityCollection";
import AddCompanyFormPopupView from "views/addCompanyPopupView";

export default class Employees extends JetView {
	config() {

		var employeesList = {
			rows: [
				{view: "toolbar",elements: [
					{view:"label",label: "Companies"}
				]},
				{view:"search", localId:"searchEmployees",placeholder: "search...",
					on: {
						"onTimedKeyPress":function() {
							var value = this.getValue().toLowerCase();
							this.$scope.$$("employeesList").filter((obj) => {
								return obj.Company.toLowerCase().indexOf(value)==0;
							});
						}
					}},
				{	
					view: "list",
					localId: "employeesList",
					select: true,
					width: 280,
					css: "employees_list",
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
										companyCollection.remove(id); 
										return false;
									}
								}
							});
						}
        
					},
					on: {
						"onAfterSelect": (id) => {	
							this.setParam("id", id, true);	
							this.$$("employeesDatatable").sync(employeesCollection, () => {
								this.$$("employeesDatatable").filter((obj) => {
									return obj.CompanyID == this.$$("employeesList").getSelectedItem().id;
								});
							});
						},
					},
				},
				{ 
					view: "button",
					localId:"addButton",
					type:"iconButton",
					icon: "plus",
					label:"Add company",
					width: 270,
					css: "add_company",
					click: (id) => {
						this._jetPopup.showWindow(id);
					} 
				}
			]
		};

		var toolbar = {
			view: "toolbar",
			localId: "toolbar",
			height:50, 
			cols: [
				{view: "spacer"},
				{ 
					view: "button",
					id:"addButton",
					type:"iconButton",
					icon: "plus",
					width: 120,
					label:"Add",
					css: "addEmployees",
					click: () => {
						this.app.callEvent("onClickemployeesForm", []);
						this.show("employeesForm");
					} 
				},
				{
					view: "button",
					type: "icon",
					icon: "trash",
					label: "Delete",
					width: 120,
					click: () => {
						let id = this.getParam("id");
						webix.confirm({
							text:"Do you still want to remove this employee?",
							callback: (result) => {
								if (result) {
									let activitiesIds = activityCollection
										.find((activity) => activity.ContactID == id)
										.map((activity) => activity.id);
									if (id) {
										employeesCollection.remove(id);
										activityCollection.remove(activitiesIds);
										this.app.callEvent("onDataDelete",[]);
									}
									return;
								}
							}
						});
					}
				},
			]
		};
         

		var employeesDatatable = {
			view: "datatable", 
			localId: "employeesDatatable",
			select: true,
			editable:true,
			columns: [
				{id: "FirstName",header: "First Name",editor: "text"},
				{id: "LastName",header: "Last Name",editor:"text"},
				{id: "Phone",header: "Phone",editor:"text",width:150},
			],
			on: {
				"onAfterSelect": (id) => {	
					this.show(`employeesInformation?id=${id}`);
				},
			},
		};
         
		var ui = {
			rows:[{
				cols: [
					employeesList,
					{view:"resizer"},
					{rows: [
						toolbar,
						employeesDatatable,
					]},
					{view:"resizer"},
					{$subview: true},        
				]}
			]
		};
		return ui;  
	}
    
	getEmployeesList() {
		return this.$$("employeesList");
	}

	init() {
		this._jetPopup = this.ui(AddCompanyFormPopupView);
		this.$$("employeesDatatable").sync(employeesCollection);
		this.$$("employeesList").sync(companyCollection);
		this.on(this.app,"onDataDelete",() => this.$$("employeesDatatable").select(employeesCollection.getFirstId()));
		employeesCollection.data.attachEvent("onIdChange", (oldId,newId) => {
			this.$$("employeesDatatable").select(newId);
		});             
	}
}