import React, { useState, useEffect } from "react";
import StudentTable from "./StudentTable";
import StudentForm from "./StudentForm";
import * as studentApi from "./studentApi";

export default function App() {
    const [studentList, setStudentList] = useState([]);
    const [student, setStudent] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        onMount();
    }, []);

    async function onMount() {
        setLoading(true);
        setError(undefined);

        try {
            const studentList = await studentApi.getAllStudents();
            setStudentList(studentList);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    function onCreateBtnClicked() {
        setStudent(null);
        setShowForm(true);
        setError(undefined);
    }

    function onEditBtnClicked(student) {
        setStudent(student);
        setShowForm(true);
        setError(undefined);
    }

    function onCancelBtnClicked() {
        setShowForm(false);
    }

    async function onDeleteBtnClicked(student) {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
            return;
        }

        setLoading(true);
        setError(undefined);
        try {
            await studentApi.deleteStudent(student.id);
            const studentList = await studentApi.getAllStudents();
            setStudentList(studentList);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function onCreateConfirmed(id, firstName, lastName, isMale, uvuId, race, age, isVeteran) {
        setLoading(true);
        setError(undefined);

        try {
            await studentApi.createStudent(firstName, lastName, isMale, uvuId, race, age, isVeteran);
            const studentList = await studentApi.getAllStudents();
            setStudentList(studentList);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setShowForm(false);
        }
    }

    async function onEditConfirmed(id, firstName, lastName, isMale, uvuId, race, age, isVeteran) {
        setLoading(true);
        setError(undefined);

        try {
            await studentApi.updateStudent(id, firstName, lastName, isMale, uvuId, race, age, isVeteran);
            const studentList = await studentApi.getAllStudents();
            setStudentList(studentList);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setShowForm(false);
        }
    }

    return (
        <div className="container">
            {showForm && student && 
                <StudentForm 
                    student={student}
                    loading={loading}
                    error={error}
                    onSubmit={onEditConfirmed}
                    onCancelBtnClicked={onCancelBtnClicked} />}

            {showForm && !student &&
                <StudentForm 
                    onSubmit={onCreateConfirmed}
                    loading={loading}
                    error={error}
                    onCancelBtnClicked={onCancelBtnClicked} />}
                    
            {!showForm &&
                <StudentTable 
                    studentList={studentList}
                    onCreateBtnClicked={onCreateBtnClicked}
                    onEditBtnClicked={onEditBtnClicked}
                    onDeleteBtnClicked={onDeleteBtnClicked}
                    loading={loading}
                    error={error} />}
        </div>
    );
}

