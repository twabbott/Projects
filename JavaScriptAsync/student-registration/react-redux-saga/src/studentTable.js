import React from 'react';
import { connect } from "react-redux";

import { showCreateStudentFormAction } from "./store";

import StudentRow from "./studentRow";

const mapStateToProps = state => {
    return { 
        students: state.students.students,
        updating: state.students.updating,
        error: state.students.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateBtnClicked: student => dispatch(showCreateStudentFormAction())
    };
}

const StudentTable = (props) => {
    let studentList = props.students.map(student => 
        <StudentRow key={student.id} student={student} />);

    let studentCount;
    switch (props.students.length) {
        case 0:
            studentCount = "No students have registered.";
            break;

        case 1:
            studentCount = "1 student";
            break;

        default:
            studentCount = `${props.students.length} students`;
            break;
    }

    return (
        <div>
            <h1>Student Registration</h1>
            <button type="button" className="btn btn-primary"
                onClick={props.onCreateBtnClicked}>
                Create Student
            </button>
            <span> { props.updating && <i>Updating...</i>}</span>
            { props.error && <div className="text-white bg-danger">{props.error}</div> }
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
                    {studentList}
                </tbody>
            </table>
            <div>{studentCount}</div>

            <footer>
                Student Registration demo app using the following:
                <ul>
                    <li>React</li>
                    <li>Axios</li>
                    <li>Redux</li>
                    <li>Redux Saga</li>
                </ul>
            </footer>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentTable);