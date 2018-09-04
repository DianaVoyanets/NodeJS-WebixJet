import {JetView} from "webix-jet";
import {contacts_collection} from "models/contactsCollection";

export default class Settings extends JetView {
	config() {
		
		const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();


		var localeSelector = {
			name: "lang", optionWidth: 120, view: "segmented", options: [
				{ id: "en", value: _("English") },
				{ id: "ru", value: _("Russian") }
			], click: () => this.toggleLanguage(),value: lang
		};
        
		var SettingsForm = {
			view: "form",
			width: 400,
			localId: "filesUploaderForm",
			elements:[
				{ id:"ContactID",name: "ContactID",view:"combo",labelWidth:115, label:"Employee Name",options: { body:{template:"#FirstName# #LastName#",data:contacts_collection}} },
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
			width: 400,
			height: 500,
			columns: [
				{id:"ContactID",name:"ContactID",header: "Employee Name",width: 200,options:contacts_collection},
				{id:"name",header: "File Name"},
			]
		};
        
		return {
			rows: [{
				cols: [
					{view: "spacer"},
					{view: "spacer"},
					{view: "spacer"},
					localeSelector
				]},
			{cols: [
				SettingsForm,
				FilesEmployes,
				{view: "spacer"}
			]},
			{view: "spacer"},
			]};
	}
    
	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.getRoot().queryView({ name: "lang" }).getValue();
		langs.setLang(value);
	}

	init() {
		
	}
}