import {JetView} from "webix-jet";
import {employeesCollection} from "models/employeesCollection";

export default class Settings extends JetView {
	config() {
		var SettingsForm = {
			view: "form",
			width: 400,
			localId: "filesUploaderForm",
			elements:[
				{cols: [
					{ view: "checkbox",
						localId:"nameCheckbox",
						labelWidth:125,
						label: "Employee Name:",
						click: () => {
							if(this.$$("nameCheckbox").data.value === "1") {
								this.$$("ContactID").show();
							} else {
								this.$$("ContactID").hide();
							}
						}},
					{ view: "checkbox",
						localId: "emailCheckbox",
						label: "Employee Email",
						labelWidth:125,
						click: () => {
							if (this.$$("emailCheckbox").data.value === "1") {
								this.$$("Email").show();
							} else {
								this.$$("Email").hide();
							}
						}},
				]},
				{ view:"combo",id:"ContactID",name: "ContactID",labelWidth:125, label:"Employee Name:",options: { body:{template:"#FirstName# #LastName#",data:employeesCollection}},validate:webix.rules.isNotEmpty,invalidMessage: "First Name can not be empty",hidden:true},
				{ view:"combo",id:"Email",name: "Email",labelWidth:125, label:"Employee Email:",options: { body:{template:"#Email#",data:employeesCollection}},validate:webix.rules.isNotEmpty,invalidMessage: "Email can not be empty",hidden:true},
				{ view:"uploader",name: "name",link: "mylist",value:"Attach File", upload:"http://localhost:3001/formdoUpload"},
				{ view:"list", id:"mylist", type:"uploader",autoheight:true, borderless:true},
				{ view:"button", value:"Save",
					click: () => {
						if (this.$$("filesUploaderForm").validate()) {
							let data = this.$$("filesUploaderForm").getValues();
							this.$$("filesDatatable").add(data);
							this.$$("filesUploaderForm").clear();
						}
					}
				},
			]
		};
        
		var FilesEmployes = {
			view:"datatable",
			scroll:false,
			width: 800,
			localId: "filesDatatable",
			columns: [
				{ id: "ContactID",name:"ContactID",header: "Employee Name",width: 200,options:employeesCollection},
				{ id: "Email",header: "Email",width: 300,options:employeesCollection},
				{ id: "name",header: "File Name",width: 300,fillspace: true},
			]
		};
        
		return {
			rows: [{
				cols: [
					SettingsForm,
					FilesEmployes,
					{view: "spacer"}
				]},
			{view: "spacer"},
			]};
	}
}