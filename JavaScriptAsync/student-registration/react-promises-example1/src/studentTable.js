import React, { Component } from 'react';
import StudentRow from "./studentRow";

export default class StudentTable extends Component {
    _makeStudentList() {
        return this.props.studentList.map(student => 
            <StudentRow
                key={student.id}
                student={student}
                onEditBtnClicked={this.props.onEditBtnClicked}
                onDeleteBtnClicked={this.props.onDeleteBtnClicked} />);
    }

    _studentCount() {
        if (this.props.studentList.length === 0)
            return <div>No students have registered.</div>
        
        if (this.props.studentList.length === 1)
            return <div>1 student</div>

        return <div>{this.props.studentList.length} students</div>
    }

    render() { 
        return (
            <div>
                <h1>Student Registration</h1>
                <button type="button" className="btn btn-primary" disabled={this.props.updating}
                    onClick={this.props.onCreateBtnClicked}>
                    Create Student
                </button>
                {this.props.updating && <span>Updating...</span>}
                {this.props.error && <span class="danger">{this.props.error}</span>}
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
                        {this._makeStudentList()}
                    </tbody>
                </table>
                {this._studentCount()}
                <footer>
                    Student Registration demo app using the following:
                    <ul>
                        <li>React</li>
                        <li>Axios</li>
                        <li>Promises with explicit error hanling in each .then()</li>
                    </ul>
                </footer>
            </div>
        );
    }
}
