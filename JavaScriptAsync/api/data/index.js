//*** Internal variables ******************************
var _studentList = [];

// This is an internal ID that we give each Student object.  This will 
// make each record easier to edit (in a later assignment).
var _nextStudentId = 1000;


//*** Student constructor ******************************
 function Student(fn, ln, g, uid, r, a, v) {
    this.id = _nextStudentId++;
    this.firstName = fn;
    this.lastName = ln;
    this.male = g;
    this.uvuId = uid;
    this.race = r;
    this.age = a;
    this.isVeteran = v;
};


//*** External functions *******************************
var StudentTable = {
    createStudent: function (firstName, lastName, male, uvuId, race, age, isVeteran) {
        var newStudent = new Student(
            firstName, lastName, male, uvuId, race, age, isVeteran);

        _studentList.push(newStudent);
        return newStudent;
    },

    getAllStudents: function () {
        return _studentList;
    },

    getStudent: function (id) {
        for (x in _studentList) {
            if (_studentList[x].id === id) {
                return _studentList[x];
            }
        }

        return null;
    },

    updateStudent: function (id, firstName, lastName, male, uvuId, race, age, isVeteran) {
        var found = false;
        for (var i in _studentList) {
            if (_studentList[i].id == id) {
                found = true;
                _studentList[i].firstName = firstName;
                _studentList[i].lastName = lastName;
                _studentList[i].male = male;
                _studentList[i].uvuId = uvuId;
                _studentList[i].race = race;
                _studentList[i].age = age;
                _studentList[i].isVeteran = isVeteran;
                break;
            }
        }

        return found;
    },

    deleteStudent: function (id) {
        if (id < 1000 || id > _nextStudentId)
            return false;

        for (x in _studentList) {
            if (_studentList[x].id === id) {
                _studentList.splice(x, 1);
                return true;
            }
        }

        return false;
    }
};

StudentTable.createStudent("Denzel", "Washington", true, 11223344, "black", 23, true);
StudentTable.createStudent("Tom", "Cruise", true, 88226644, "caucasian", 32, false);
StudentTable.createStudent("Jackie", "Chan", true, 33661199, "asian", 34, false);
StudentTable.createStudent("Jennifer", "Lopez", false, 99110099, "hispanic", 32, true);

exports.StudentTable = StudentTable;


