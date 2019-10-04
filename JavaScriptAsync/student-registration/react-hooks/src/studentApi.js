////////////////////////////////////////////////////////////////////////////////
///   M o d e l
////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';

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

// Creates a new student
export async function createStudent(firstName, lastName, male, uvuId, race, age, isVeteran) {
    try {
        const response = await axios({
            method: "post",
            url: "http://localhost:8192/api/students",
            data: { firstName, lastName, male, uvuId, race, age, isVeteran }
        })
    
        return response.data;
    } catch (err) {
        throw Error(makeErrorMessage(err));
    }
}

// Gets all students in the list
export async function getAllStudents() {
    try {
        const response = await axios({
            method: "get",
            url: "http://localhost:8192/api/students"
        });
    
        return response.data;
    } catch (err) {
        throw Error(makeErrorMessage(err));
    }
}

// Updates a student
export async function updateStudent(id, firstName, lastName, male, uvuId, race, age, isVeteran) {
    try {
        const response = await axios({
            method: "put",
            url: `http://localhost:8192/api/students/${id}`,
            data: { firstName, lastName, male, uvuId, race, age, isVeteran }
        });
    
        return response.data;
    } catch (err) {
        throw Error(makeErrorMessage(err));
    }
}

// Deletes a student
export async function deleteStudent(id) {
    try {
        await axios({
            method: "delete",
            url: `http://localhost:8192/api/students/${id}`
        });
    } catch(err) {
        throw Error(makeErrorMessage(err));
    }
}

