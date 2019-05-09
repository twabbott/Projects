import React from "react";
import { connect } from "react-redux";

import {
  showCreateStudentFormAction,
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

function mapDispatchToProps(dispatch) {
  return {
    onCreateBtnClicked: () => dispatch(showCreateStudentFormAction())
  };
};

function StudentList({students, updating, error, onCreateBtnClicked}) {
  return (
    <div>
      <h1>Student Registration</h1>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onCreateBtnClicked}
      >
        Create Student
      </button>
      <span> {updating && <i>Updating...</i>}</span>
      {error && <div className="text-white bg-danger">{error}</div>}
      <Table students={students} />
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
