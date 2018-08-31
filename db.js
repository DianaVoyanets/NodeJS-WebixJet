var Sequelize = require("sequelize");

var sequelize = new Sequelize("sampledb","root","1",{
	host: "localhost",
	dialect: "sqlite",
	storage: "database.sqlite"
});

var Contacts = sequelize.define("contacts", {
	FirstName: Sequelize.STRING,
	LastName: Sequelize.STRING,
	StartDate: Sequelize.DATE,
	StatusID: Sequelize.STRING,
	Job: Sequelize.STRING,
	Company: Sequelize.STRING,
	Website: Sequelize.STRING,
	Address: Sequelize.STRING,
	Email: Sequelize.STRING,
	Skype: Sequelize.STRING,
	Phone: Sequelize.STRING,
	Birthday: Sequelize.DATE
});

var Activity = sequelize.define("activity",{
	Details: Sequelize.STRING,
	TypeID: Sequelize.INTEGER,
	State: Sequelize.STRING,
	ContactID: Sequelize.INTEGER,
	DueDate: Sequelize.DATE
});

var Statuses = sequelize.define("statuses",{
	Value: Sequelize.STRING,
	Icon: Sequelize.STRING
});

var ActivityType = sequelize.define("activityType",{
	Value: Sequelize.STRING,
	Icon: Sequelize.STRING
});

var Company = sequelize.define("companies",{
	Company: Sequelize.STRING
})


sequelize.sync({ force: true }).then(() => {

	Company.create({Company:"Epam"});
	Company.create({Company:"XBSoftWare"});
	
	Contacts.create({
		Address:"qeqwe",
		Birthday: new Date(),
		Email:"alex@gmail.com",
		FirstName:"qweqwe",
		Job:"qwewqe",
		LastName:"",
		Company: "Epam",
		Phone:"",
		Photo:"",
		Skype:"",
		StartDate:new Date("01-01-0001"),
		StatusID:0,
		Website:""
	});

	Activity.create({
		Details: "Some",
		TypeID: 2,
		State: "Open",
		ContactID: 2,
		DueDate: new Date("01-01-0001")
	});
        
	Statuses.create({
		Value: "qweqwe",
		Icon: "user"
	});
    
	ActivityType.create({
		Value: "state A",
		Icon: "cogs"
	});
    
	ActivityType.create({
		Value: "state B",
		Icon: "cogs"
	});
});

module.exports = {
	Contacts, Activity, Statuses, ActivityType,Company
};