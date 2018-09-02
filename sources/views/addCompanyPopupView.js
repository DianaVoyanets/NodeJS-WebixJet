import {JetView} from "webix-jet";
import {company_collection} from "models/companyCollection";

export default class AddCompanyFormPopupView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view:"window", 
			move:true,
			localId: "form-popup",
			head:"Add company",
			position:"center",
			body:{
				view:"form",
				localId: "form",
				elements: [
					{view: "text",label: "Company",name: "Company"},
					{cols:[
						{view: "spacer"},
						{view: "button",value: "Add",width: 120,click:() => this.saveData()},
						{view: "button",value: "Cancel",width: 120,click: ()=> this.$$("form-popup").hide()},
					]}
				],
			}
		};
	}
    
	showWindow(id) {
		// let values = contacts_collection.getItem(id);
		// this.$$("form").setValues(values);
		this.getRoot().show();
	}
    
	saveData() {
		var values = this.$$("form").getValues();
		if (this.$$("form").validate()) {
			company_collection.add(values);
			this.$$("form").hide();
		}
	}
}