import {JetView} from "webix-jet";
import {contacts_collection} from "models/contactsCollection";
import {activity_collection} from "models/activityCollection";

export default class ContactsInformation extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		var toolbar = {
			view: "toolbar",
			localId: "my_toolbar",
			height:50, 
			cols: [{ 
				view: "label",
				localId: "mylabel",
				align: "center",
				label: "#FirstName# #LastName#", 
			}],
		};
        
		var iconTemplate = {
			view: "template", 
			localId:"icon-template",
			template: (obj) =>{
				return (
					`<div class='wrapper'> 
						<div class="col-2">
							<span><i class='fa fa-mobile'> <b>Phone:</b></i>${obj.Phone}</span> 
							<span><i class='fa fa-envelope'> <b>Email:</b></i>${obj.Email}</span> 
                            <span><i class='fa fa-skype'> <b>${_("Skype")}:</b></i>${obj.Skype}</span>
                        </div>
						<div class="col-3">
							<span><i class='fa fa-tag'> <b>${_("Job")}:</b></i>${obj.Job}</span>
							<span><i class='fa fa-telegram'> <b>${_("Website")}:</b> </i>${obj.Website}</span>
                            <span><i class='fa fa-map-marker'> <b>${_("Location")}:</b></i>${obj.Address}</span>
                        </div>
                    </div>`
				);
			}
		};
        
		var ui = {
			rows: [
				toolbar,
				{cols: [
					iconTemplate,
				]},
			],
		};
        
		return ui;
	}

	getId() {
		return this.getParam("id",true);
	}
    
	urlChange() {
		contacts_collection.waitData.then(()=>{
			if (this.getId() && contacts_collection.exists(this.getId())) {
				let contactsValues = contacts_collection.getItem(this.getId());
                
				this.$$("mylabel").setValue(contactsValues.FirstName + " " + contactsValues.LastName);
				this.$$("icon-template").setValues(contactsValues);
			}
		});
		
	}
}
