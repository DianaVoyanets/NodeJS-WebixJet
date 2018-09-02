import {JetView} from "webix-jet";
import {contacts_collection} from "models/contactsCollection";

export default class Settings extends JetView {
	config() {
		
		const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();


		var localeSelector = {
			name: "lang", optionWidth: 120, view: "segmented", label: _("Language"), options: [
				{ id: "en", value: _("English") },
				{ id: "ru", value: _("Russian") }
			], click: () => this.toggleLanguage(),value: lang
		};
        
		var SettingsForm = {
			view: "form",
			width: 400,
			localId: "filesUploaderForm",
			elements:[
				{ id:"FirstName",name: "FirstName",view:"combo",labelWidth:115, label:"Employe Name",options: { body:{template:"#FirstName# #LastName#",data:contacts_collection}} },
				{cols:[
					{ id: "fileName",view:"uploader", name:"attachments", value:"Attach File", upload:"http://localhost:3001/form/do-upload" },
				]},
				{ view:"button", value:"Save", type:"form",
					click: () => {
						console.log(this.$$("filesUploaderForm").getValues());
					}
					
				}
			]
		};
        
		var FilesEmployes = {
			view:"datatable",
			localId: "filesDatatable",
			columns: [
				{id:"Name",name: "name",header: "Employee Name"},
				{id:"file",name:"fileName",header: "File Name"}
			]
		};
        
		return {
			rows: [{
				cols: [
					{view: "spacer"},
					{view: "spacer"},
					localeSelector
				]},
			{cols: [
				SettingsForm,
				FilesEmployes
			]},
			{view: "spacer"},
			]};
	}
    
	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.getRoot().queryView({ name: "lang" }).getValue();
		langs.setLang(value);
	}
}