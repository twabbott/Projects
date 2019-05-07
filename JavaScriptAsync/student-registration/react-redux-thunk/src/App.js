import React from "react";
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

class App extends React.Component {
  componentDidMount() {
    this.props.readAllStudents();
  }

  render() {
    return (
      <div className="container">
        {this.props.isFormVisible ? <StudentForm /> : <StudentList />}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
