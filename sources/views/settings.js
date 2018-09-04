import {JetView} from "webix-jet";
import {employeesCollection} from "models/employeesCollection";

export default class Settings extends JetView {
	config() {
		
		var SettingsForm = {
			view: "form",
			width: 400,
			localId: "filesUploaderForm",
			elements:[
				{ id:"ContactID",name: "ContactID",view:"combo",labelWidth:115, label:"Employee Name",options: { body:{template:"#FirstName# #LastName#",data:employeesCollection}} },
				{ name: "name",view:"uploader",link: "mylist",value:"Attach File", upload:"http://localhost:3001/formdoUpload"},
				{ view:"list",  id:"mylist", type:"uploader",autoheight:true, borderless:true},
				{ view:"button", value:"Save",
					click: () => {
						let data = this.$$("filesUploaderForm").getValues();
						this.$$("filesDatatable").add(data);
						this.$$("filesUploaderForm").clear();
					}
				},
			]
		};
        
		var FilesEmployes = {
			view:"datatable",
			localId: "filesDatatable",
			columns: [
				{id:"ContactID",name:"ContactID",header: "Employee Name",width: 200,options:employeesCollection},
				{id:"name",header: "File Name"},
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