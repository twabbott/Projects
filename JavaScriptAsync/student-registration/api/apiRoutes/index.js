var dal = require("../data");
var studentTable = dal.StudentTable;

var timeout = 3000;

exports.init = function (app) {
    /******************************************************
     ***   GET /api/hello
     ******************************************************/
    app.get("/api/hello", function (req, res, next) {

        res.set("Content-Type", "application/json");

        res.send({
            message: "Hello, world!"
        });
    });


    /******************************************************
     ***   GET /api/students
     ******************************************************/
    app.get("/api/students", function (req, res, next) {
        setTimeout(function() {
            // Fetch all the students
            var table = studentTable.getAllStudents();

            // Compose the response
            res.set("Content-Type", "application/json");
            res.send(table);
        }, timeout);
    });


    /******************************************************
     ***   GET /api/students/<id>
     ******************************************************/
    app.get("/api/students/:Id", function (req, res, next) {
        setTimeout(function() {
            var id = parseInt(req.params.Id);
            if (isNaN(id)) {
                res.status(400).send({error: "\"" + req.params.Id + 
                    "\" is not a number."});
                return;
            }

            // Fetch the student by ID
            var student = studentTable.getStudent(id);

            // If there is no student for that ID, send a 404
            if (student == null) {
                res.status(404).send({error: "No record found matching id=" + 
                    req.params.Id + "."});
                return;
            }

            // Return the student object
            res.set("Content-Type", "application/json");
            res.send(student);
        }, timeout);
    });


    /******************************************************
     ***   POST /api/students
     ******************************************************/
    app.post("/api/students", function (req, res) {
        setTimeout(function() {
                // Create the new student object
            var student = studentTable.createStudent(
                req.body.firstName,
                req.body.lastName,
                req.body.male,
                req.body.uvuId,
                req.body.race,
                req.body.age,
                req.body.isVeteran);

            if (student == null) {
                res.status(400).send({error: "You did the bad thing."});
                return;
            }

            res.set("Content-Type", "application/json");
            var uri = 'http://' + req.headers["host"] + req.url + '/' + student.id;
            res.set("Location", uri);
            res.send(student);
        }, timeout);
    });


    /******************************************************
     ***   PUT /api/students/<id>
     ******************************************************/
    app.put("/api/students/:Id", function (req, res) {
        setTimeout(function() {
            var id = parseInt(req.params.Id);
            if (isNaN(id)) {
                res.status(404).send({error: "Not found."});
                return;
            }

            // Update the student
            var found = studentTable.updateStudent(
                id, 
                req.body.firstName,
                req.body.lastName,
                req.body.male,
                req.body.uvuId,
                req.body.race,
                req.body.age);
                
            if (!found) {
                res.status(404).send({error: "No record found matching id=" + 
                    req.params.Id + "."});
                return;
            }

            req.body.id = id;
            res.set("Content-Type", "application/json");
            res.send(req.body);
        }, timeout);
    });


    /******************************************************
     ***   DELETE /api/students/<id>
     ******************************************************/
    app.delete("/api/students/:Id", function (req, res) {
        setTimeout(function() {
            var id = parseInt(req.params.Id);
            if (isNaN(id)) {
                res.status(400).send({error: "\"" + req.params.Id + 
                    "\" is not a number."});
                return;
            }

            var found = studentTable.deleteStudent(id);
            if (!found) {
                res.status(404).send({error: "No record found matching id=" + 
                    req.params.Id + "."});
                return;
            }

            res.sendStatus(204);
        }, 3000);
    });
}

