import {JetView} from "webix-jet";
import {activity_collection} from "models/activityCollection";
import {activity_type_collection} from "models/activityTypeCollection";
import {contacts_collection} from "models/contactsCollection";
import PopupView from "./activityForm";

export default class DataView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		var toolbar = {
			view: "toolbar",
			elements: [
				{ view: "spacer"},
				{ view: "button",name: "Export",id: "export_button",type:"iconButton",icon:"file-excel-o",label: "Export to Excel",autowidth: true,
					click:()=>{
						webix.toExcel(this.$$("activityDataTable"),
							{ filename:"ActivityTable",ignore: { "State" :true,"pencil-icon" :true,"trash-icon": true}}
						);

					}},
				{ view: "button",name: "Refresh",id: "refresh_button",type: "iconButton",icon:"refresh",label: "Refresh",autowidth: true,
					click: () => {
						this.$$("activityDataTable").clearAll();
						this.$$("activityDataTable").load("http://localhost:3001/activity/");
					}},
				{ view: "button",name:"Add",id:"add_button",type:"iconButton",icon: "plus",label: _("Add activity"),autowidth:true,
					click:() => {
						this._jetPopup.showWindow();
					}
				},
			]
		};

		var activityTable = {
			rows: [
				{
					view:"datatable",
					localId: "activityDataTable",
					select: true,
					columns:[
						{ id:"State",header:"",template:"{common.checkbox()}",width: 50},
						{ id:"TypeID", header:[_("Activity type"),{content:"selectFilter"}], width:250,sort:"string",options: activity_type_collection,fillspace:true},
						{ id:"Details", header:[_("Details"),{content:"textFilter"}],width:250,sort:"string"},
						{ id:"ContactID", header:[_("Contact"),{content:"selectFilter"}],width:250,sort:"string",options: contacts_collection},
						{ id:"trash-icon", header: "",template: "{common.trashIcon()}",width:50},
					],
					on: {
						onAfterSelect: 
                            (id) => {
                            	return this._jetPopup.showWindow(id);
                            },
					},
					onClick: {
						"fa-trash": function(e, id) {
							webix.confirm({
								text:"Do you still want to remove field?",
								callback: function(result) {
									if (result) {
										activity_collection.remove(id);
										return false;
									}
								}
							});
						}
					},
				},
			]	
		};

		var ui = {
			rows: [
				toolbar,
				activityTable
			]
		};
        
		return ui;
	}
    
	init() {
		this._jetPopup = this.ui(PopupView);
		this.$$("activityDataTable").sync(activity_collection);
	}
}