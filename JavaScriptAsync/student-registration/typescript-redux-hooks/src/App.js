import React, { useEffect } from "react";
import { connect } from "react-redux";

import { 
  readAllStudentsThunk,
  appStateIsFormVisibleSelector
} from "./store";
import StudentList from "./StudentList";
import StudentForm from "./StudentForm";

function mapStateToProps(state) {
  return {
    isFormVisible: appStateIsFormVisibleSelector(state)
  };
};

function mapDispatchToProps(dispatch) {
  return {
    readAllStudents: () => dispatch(readAllStudentsThunk())
  };
};

function App({ isFormVisible, readAllStudents }) {
  useEffect(() => {
    readAllStudents(); 
  }, []); // eslint-disable-line

  return (
    <div className="container">
      {isFormVisible ? <StudentForm /> : <StudentList />}
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
