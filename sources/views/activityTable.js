import {JetView} from "webix-jet";
import {activityCollection} from "models/activityCollection";
import {activityTypeCollection} from "models/activityTypeCollection";
import {employeesCollection} from "models/employeesCollection";
import PopupView from "./activityForm";

export default class DataView extends JetView {
	config() {

		var toolbar = {
			view: "toolbar",
			elements: [
				{view: "spacer"},
				{view: "button",name: "Export",id: "export_button",type:"iconButton",icon:"file-excel-o",label: "Export to Excel",autowidth: true,
					click:() => {
						webix.toExcel(this.$$("activityDatatable"),
							{ filename:"ActivityTable",ignore: { "State" :true,"trash-icon": true}}
						);
					}},
				{view: "button",name: "Refresh",id: "refresh_button",type: "iconButton",icon:"refresh",label: "Refresh",autowidth: true,
					click:() => {
						this.refresh();	
					}},
				{view: "button",name:"Add",id:"addButton",type:"iconButton",icon: "plus",label: "Add activity",autowidth:true,
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
					localId: "activityDatatable",
					select: true,
					columns:[
						{ id:"State",header:"",template:"{common.checkbox()}",width: 50,edit: "text"},
						{ id:"TypeID", header:["Activity type",{content:"selectFilter"}], width:250,sort:"string",options: activityTypeCollection,fillspace:true},
						{ id:"Details", header:["Details",{content:"textFilter"}],width:250,sort:"string"},
						{ id:"ContactID", header:["Contact",{content:"selectFilter"}],width:250,sort:"string",options: employeesCollection},
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
										activityCollection.remove(id);
										return false;
									}
								}
							});
						}
					},
				},
			]	
		};

		return {
			rows: [
				toolbar,
				activityTable
			]
		};
	}
	
	getActivityDatatable() {
		return this.$$("activityDatatable");
	}

	refresh() {
		this.getActivityDatatable().eachColumn( function(id) {
			if(id !== "State" && id !== "trash-icon") {
				var filter = this.getFilter(id);
				if (filter) {
					if (filter.setValue) {
						filter.setValue("");
					}	 
					else filter.value = "";					
				}
			}
		});	
		this.getActivityDatatable().clearAll();
		this.getActivityDatatable().load(activityCollection.data.url);
	}
	
	init() {
		this._jetPopup = this.ui(PopupView);
		this.getActivityDatatable().sync(activityCollection);
	}
}