import {JetView,plugins} from "webix-jet";

export default class TopView extends JetView{
	config() {	
		var menu = {
			view: "sidebar",
			select: true,
			id:"top:menu", 
			width: 250, 
			layout:"y",
			template:"<span class='webix_icon fa-#icon# top-icon'></span> #value# ",
			data:[
				{ value:"Employees", id:"Employees", icon:"users",data: [
					{ id: "employeesList", value: "Employees List",icon: "list-alt"},
					{ id: "employeesDatatable",value: "Employees Datatable",icon:"wpforms"},
				]},
				{ value:"Activities",id:"activities",icon:"calendar",data: [
					{id: "activityTable",value: "Activity Datatable",icon:"wpforms"},
				]},
				{ value:"Settings",id:"settings",icon:"cogs"}
			]
		};

		var ui = {
			type: "line",  rows: [
				{ view: "toolbar",elements: [{type: "header", id: "topLabel", template: "#value#", css: "topLabel"}]},
				{
					cols: [
						{
							css: "app-left-panel", 
							padding: 10, margin: 20, borderless: true, rows: [menu]
						},
						{
							rows: [{ height: 10 },
								{
									type: "clean", css: "app-right-panel", padding: 4, rows: [
										{ $subview: true }
									]
								}
							]
						}
					]
				}]
		};

		return ui;
	}
    
	init() {
		this.use(plugins.Menu, "top:menu");
		this.$$("topLabel").bind(this.$$("top:menu"));
	}
}