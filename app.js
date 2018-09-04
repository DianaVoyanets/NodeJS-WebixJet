var express = require("express");
var bodyParser = require('body-parser');
var cors = require("cors");

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

var employees = require("./controllers/employees");

app.put("/employees/:employeesId",employees.updateData);
app.delete("/employees/:employeesId",employees.removeData);
app.post("/employees",employees.addData);
app.get("/employees",employees.getData);

var activity = require("./controllers/activity");

app.put("/activity/:activityId",activity.updateData);
app.delete("/activity/:activityId",activity.removeData);
app.post("/activity",activity.addData);
app.get("/activity",activity.getData);

var statuses = require("./controllers/statuses");

app.put("/statuses/:statusId",statuses.updateData);
app.delete("/statuses/:statusId",statuses.removeData);
app.post("/statuses",statuses.addData);
app.get("/statuses",statuses.getData);

var activityTypes = require("./controllers/activityType");

app.put("/activitytypes/:typeId",activityTypes.updateData);
app.delete("/activitytypes/:typeId",activityTypes.removeData);
app.post("/activitytypes",activityTypes.addData);
app.get("/activitytypes",activityTypes.getData);

var companies = require("./controllers/companies");

app.get("/companies",companies.getData);
app.put("/companies/:companyId",companies.updateData);
app.delete("/companies/:companyId",companies.removeData);
app.post("/companies",companies.addData);

let formUpload = require("./controllers/formDoUpload");
app.post("/formdoUpload",formUpload.doUpload);


app.listen(3001);