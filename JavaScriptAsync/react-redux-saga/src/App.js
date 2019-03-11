import React from "react";
import { connect } from "react-redux";

import { readAllStudentsBeginAction } from "./store";
import StudentTable from "./studentTable";
import StudentForm from "./studentForm";

const mapStateToProps = state => {
    return { 
        isFormVisible: state.appState.isFormVisible,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        readAllStudents: () => dispatch(readAllStudentsBeginAction())
    };
}

class App extends React.Component {
    componentDidMount() {
        this.props.readAllStudents();
    }

    render() {
        return (
            <div className="container">
                {this.props.isFormVisible? <StudentForm />: <StudentTable />}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);