import {JetView} from "webix-jet";
import {companyCollection} from "models/companyCollection";

export default class AddCompanyFormPopupView extends JetView {
	config() {
		return {
			view:"window", 
			move:true,
			localId: "formPopup",
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
						{view: "button",value: "Cancel",width: 120,click: () => this.hide()},
					]}
				],
			}
		};
	}
    
	showWindow(id) {
		this.getRoot().show();
	}
    
	saveData() {
		var values = this.$$("form").getValues();
		if (this.$$("form").validate()) {
			companyCollection.add(values);
			this.hide();
		}
	}

	hide() {
		return this.$$("formPopup").hide();
	}
}