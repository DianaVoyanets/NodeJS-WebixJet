import {JetView} from "webix-jet";
import  {contacts_collection} from "models/contacts-collection";
import {status_collection} from "models/status-collection";

export default class ContactsInformation extends JetView {
	config() {
		var toolbar = {
			view: "toolbar",
			localId: "my_toolbar",
			height:50, 
			cols: [
				{ 
					view: "label",
					localId: "mylabel",
					label: "#FirstName# #LastName#", 
				},
				{view: "spacer"},
				{
					view: "button",
					type:"icon",
					icon: "trash",
					label: "Delete",
					width: 90,
				},
				{
					view: "button",
					type: "icon",
					icon: "edit",
					label: "Edit",
					width: 90
				}
			]
		}; 
    
		var templateOne = {
			view:"template",
			localId: "templateOne",
			template:
                "<figure><div class='avatar'></div><figcaption>#Value# #Icon#</figcaption</figure>",
		};
        
		var templateTwo = {
			view: "template",
			localId: "templateTwo",
			template:
                "<span><i class='fa fa-envelope'> email: </i>#Email#</span>" + 
                "<span><i class='fa fa-skype'> skype: </i>#Skype#</span>" +
                "<span><i class='fa fa-tag'> job: </i>#Job#</span>" + 
                "<span><i class='fa fa-briefcase'> company: </i>#Company#</span>"
		};

		var templateThree = {
			view: "template",
			localId: "templateThree",
			template: 
                "<span><i class='fa fa-calendar'> date of birth: </i>#Birthday#</span>"+
                "<span><i class='fa fa-map-marker'> location: </i>#Company#</span>"
		};

		var ui = {
			rows: [
				toolbar,{
					gravity: 3,
					cols: [
						templateOne,
						templateTwo,
						templateThree
					],
				}],
		};
		return ui;
	}
    
	urlChange(view) {
		var id = this.getParam("id");
		contacts_collection.waitData.then(()=>{
			if(id && contacts_collection.exists(id)) {
				view.queryView({view:"label"}).setValue(contacts_collection.getItem(id).FirstName + " " + contacts_collection.getItem(id).LastName);
				this.$$("templateOne").setValues(contacts_collection.getItem(id));
				this.$$("templateTwo").setValues(contacts_collection.getItem(id));
				this.$$("templateThree").setValues(contacts_collection.getItem(id));
				var statusValueId = contacts_collection.getItem(id).StatusID;
				if(!status_collection.exists(statusValueId)) {
					this.$$("templateOne").parse({Value:"No Status",Icon:"No Icon"});
				}
				this.$$("templateOne").setValues(status_collection.getItem(statusValueId));
			}
		});
		
	}
}
