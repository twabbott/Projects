import React from 'react';
import StudentRow from "./StudentRow";
import StudentTotal from "./StudentTotal";

export default function StudentTable({
    studentList,
    loading,
    error,
    onCreateBtnClicked,
    onEditBtnClicked,
    onDeleteBtnClicked
}) {
    function makeStudentList() {
        return studentList.map(student => 
            <StudentRow
                key={student.id}
                student={student}
                loading={loading}
                onEditBtnClicked={onEditBtnClicked}
                onDeleteBtnClicked={onDeleteBtnClicked} />);
    }

    return (
        <div>
            <h1>Student Registration</h1>
            <button type="button" className="btn btn-primary" disabled={loading}
                onClick={onCreateBtnClicked}>
                Create Student
            </button>
            { loading && <span>Loading...</span> }
            { error && <span>{error}</span> }
            <table id="studentTable"
                className="table table-striped table-hover table-sm" >
                <thead className="thead-dark">
                    <tr>
                        <th>UVU ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {makeStudentList()}
                </tbody>
            </table>
            <StudentTotal count={studentList.length} />

            <footer>
                Student Registration demo app using the following:
                <ul>
                    <li>React with react hooks</li>
                    <li>Axios</li>
                    <li>Async operations handled via async/await</li>
                </ul>
                <em>NOTE: No additional Babel / Webpack plugins are required to get this project to run.</em>
            </footer>
        </div>
    );
}
