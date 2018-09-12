var Sequelize = require("sequelize");

var sequelize = new Sequelize("sampledb","root","1",{
	host: "localhost",
	dialect: "sqlite",
	storage: "database.sqlite"
});

var Employees = sequelize.define("Employees", {
	FirstName: Sequelize.STRING,
	LastName: Sequelize.STRING,
	StatusID: Sequelize.STRING,
	Job: Sequelize.STRING,
	CompanyID: Sequelize.INTEGER,
	Website: Sequelize.STRING,
	Address: Sequelize.STRING,
	Email: Sequelize.STRING,
	Skype: Sequelize.STRING,
	Phone: Sequelize.STRING,
});


var Activity = sequelize.define("activity",{
	Details: Sequelize.STRING,
	TypeID: Sequelize.INTEGER,
	State: Sequelize.STRING,
	ContactID: Sequelize.INTEGER,
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
});

var File = sequelize.define("file",{
	ContactID: Sequelize.INTEGER,
	name: Sequelize.STRING,
	path: Sequelize.STRING
});

sequelize.sync({ force: true }).then(() => {

	Company.create({Company:"XB Software"});
	Company.create({Company:"Epam"});

	for (var i = 0; i < 100;i++) {
		Employees.create({
			Address:"qeqwe", 
			Email:"alex@gmail.com",
			FirstName:"qweqwe",
			Job:"qwewqe",
			LastName:"qweqwe",
			CompanyID: 1,
			Phone:"3751981981",
			Skype:"asdasd",
			StatusID:0,
			Website:"adasdasd"
		});
	}

	Activity.create({
		Details: "Some",
		TypeID: 2,
		State: "Open",
		ContactID: 2,
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
	Employees, Activity, Statuses, ActivityType, Company, File
};