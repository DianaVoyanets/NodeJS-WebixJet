import {JetView} from "webix-jet";
import {employeesCollection} from "models/employeesCollection";

export default class employeesInformation extends JetView {
	config() {
		var toolbar = {
			view: "toolbar",
			localId: "toolbar",
			height:50, 
			cols: [{ 
				view: "label",
				localId: "mylabel",
				align: "center",
				label: "#FirstName# #LastName#", 
			},
			],
		};
        
		var iconTemplate = {
			view: "template", 
			localId:"iconTemplate",
			template: (obj) =>{
				return (
					`<div class='wrapper'> 
						<div class="col-2">
							<span><i class='fa fa-mobile'> <b>Phone:</b></i>${obj.Phone}</span> 
							<span><i class='fa fa-envelope'> <b>Email:</b></i>${obj.Email}</span> 
                            <span><i class='fa fa-skype'> <b>Skype</b></i>${obj.Skype}</span>
                        </div>
						<div class="col-3">
							<span><i class='fa fa-tag'> <b>Job:</b></i>${obj.Job}</span>
							<span><i class='fa fa-telegram'> <b>Website:</b> </i>${obj.Website}</span>
                            <span><i class='fa fa-map-marker'> <b>Location:</b></i>${obj.Address}</span>
                        </div>
                    </div>`
				);
			}
		};
        
		return  {
			rows: [
				toolbar,
				iconTemplate,
			],
		};
        
	}

	getId() {
		return this.getParam("id",true);
	}

	urlChange() {
		employeesCollection.waitData.then(()=>{
			if (this.getId() && employeesCollection.exists(this.getId())) {
				let employeesValues = employeesCollection.getItem(this.getId());
				this.$$("mylabel").setValue(employeesValues.FirstName + " " + employeesValues.LastName);
				this.$$("iconTemplate").setValues(employeesValues);
			}
		});
		
	}
}
