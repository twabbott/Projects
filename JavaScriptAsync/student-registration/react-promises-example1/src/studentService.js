////////////////////////////////////////////////////////////////////////////////
///   M o d e l
////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';

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
export function createStudent(firstName, lastName, male, uvuId, race, age) {
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

function makeErrorMessage(axiosError) {
    if (axiosError instanceof Error) {
        console.log(axiosError);
        if (axiosError.response) {
            return `Request failed: ${axiosError.response.status} ${axiosError.response.statusText}.  URL: ${axiosError.request.responseURL}`;
        }

        return `${axiosError.message} - is the node server running?`;
    }

    if (axiosError)
        return axiosError.tostring();

    return "Fatal error (no other info)";
}

// Gets all students in the list
export function getAllStudents() {
    return axios({
        method: "get",
        url: "http://localhost:8192/api/students"
    })
    .then(
        response => {
            studentList = response.data;
            return studentList;
        },
        error => Promise.reject(makeErrorMessage(error))
    )
}

// Gets a student by its ID
export function getStudent(id) {
    for (let x in studentList) {
        if (studentList[x].id === id) {
            return studentList[x];
        }
    }

    return null;
}

// Updates a student
export function updateStudent(id, firstName, lastName, male, uvuId, race, age) {
    var student = getStudent(id);
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
    .then(
        response => {
            student.firstName = response.data.firstName;
            student.lastName = response.data.lastName;
            student.male = response.data.male;
            student.uvuId = response.data.uvuId;
            student.race = response.data.race;
            student.age = response.data.age;
        
            return response.data;
        },
        error => Promise.reject(makeErrorMessage(error))
    );
}

// Deletes a student
export function deleteStudent(id) {
    return axios({
        method: "delete",
        url: `http://localhost:8192/api/students/${id}`
    })
    .then(
        () => {
            for (let x in studentList) {
                if (studentList[x].id === id) {
                    studentList.splice(x, 1);
                }
            }
        },
        error => Promise.reject(makeErrorMessage(error))
    );
}

