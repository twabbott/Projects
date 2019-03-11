////////////////////////////////////////////////////////////////////////////////
///   M o d e l
////////////////////////////////////////////////////////////////////////////////

// This is an array to keep track of all the students that have been registered.
var studentList = [];

// This is your Student constructor.
function Student(firstName, lastName, male, uvuId, race, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.male = male;
    this.uvuId = uvuId;
    this.race = race;
    this.age = age;
}

// Creates a new student
function modelCreateStudent(firstName, lastName, male, uvuId, race, age) {
    var newStudent = new Student(firstName, lastName, male, uvuId, race, age);

    return axios({
        method: "post",
        url: "http://localhost:8192/api/students",
        data: newStudent
    })
    .then(function(response) {
        studentList.push(response.data);
        return response.data;
    });
}

// Gets all students in the list
function modelGetAllStudents() {
    return axios({
        method: "get",
        url: "http://localhost:8192/api/students"
    })
    .then(function(response) {
        studentList = response.data;
        return studentList;
    })
}

// Gets a student by its ID
function modelGetStudent(id) {
    for (x in studentList) {
        if (studentList[x].id === id) {
            return studentList[x];
        }
    }

    return null;
}

// Updates a student
function modelUpdateStudent(id, firstName, lastName, male, uvuId, race, age) {
    var student = modelGetStudent(id);
    if (!student) {
        return Promise.reject("Unable to find student ID " + id);
    }

    return axios({
        method: "put",
        url: `http://localhost:8192/api/students/${student.id}`,
        data: {
            firstName: firstName,
            lastName: lastName,
            male: male,
            uvuId: uvuId,
            race: race,
            age: age
        }
    })
    .then(function(response) {
        student.firstName = response.data.firstName;
        student.lastName = response.data.lastName;
        student.male = response.data.male;
        student.uvuId = response.data.uvuId;
        student.race = response.data.race;
        student.age = response.data.age;
    
        return response.data;
    });
}

// Deletes a student
function modelDeleteStudent(id) {
    return axios({
        method: "delete",
        url: `http://localhost:8192/api/students/${id}`
    })
    .then(function() {
        for (x in studentList) {
            if (studentList[x].id === id) {
                studentList.splice(x, 1);
            }
        }
    });
}

