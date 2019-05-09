import React from "react";
import { connect } from "react-redux";

import {
  showCreateStudentFormAction,
  showEditStudentFormAction,
  deleteStudentBeginAction,
  studentsAllStudentsSelector,
  studentsIsUpdatingSelector,
  studentsUpdateErrorSelector
} from "./store";

import Table from './Table';
import StudentCount from './StudentCount';

function mapStateToProps(state) {
  return {
    students: studentsAllStudentsSelector(state),
    updating: studentsIsUpdatingSelector(state),
    error: studentsUpdateErrorSelector(state)
  };
};

const mapDispatchToProps = {
  showCreateStudentFormAction,
  showEditStudentFormAction,
  deleteStudentBeginAction
};

function StudentList({
  students, 
  updating, 
  error, 
  showCreateStudentFormAction,
  showEditStudentFormAction,
  deleteStudentBeginAction
}) {
  return (
    <div>
      <h1>Student Registration</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={showCreateStudentFormAction}
      >
        Create Student
      </button>
      <span> {updating && <i>Updating...</i>}</span>
      {error && <div className="text-white bg-danger">{error}</div>}
      <Table 
        students={students}
        showEditStudentFormAction={showEditStudentFormAction} 
        deleteStudentBeginAction={deleteStudentBeginAction} />
      <StudentCount students={students} />

      <footer>
        Student Registration demo app using the following:
        <ul>
          <li>React</li>
          <li>Axios</li>
          <li>Redux</li>
          <li>Redux Thunk</li>
        </ul>
      </footer>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentList);
