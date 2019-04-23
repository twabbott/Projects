import React, { Component } from 'react';
import StudentRow from "./StudentRow";
import StudentTotal from "./StudentTotal";

export default class StudentTable extends Component {
    _makeStudentList() {
        return this.props.studentList.map(student => 
            <StudentRow
                key={student.id}
                student={student}
                loading={this.props.loading}
                onEditBtnClicked={this.props.onEditBtnClicked}
                onDeleteBtnClicked={this.props.onDeleteBtnClicked} />);
    }

    render() { 
        return (
            <div>
                <h1>Student Registration</h1>
                <button type="button" className="btn btn-primary" disabled={this.props.loading}
                    onClick={this.props.onCreateBtnClicked}>
                    Create Student
                </button>
                { this.props.loading && <span>Loading...</span> }
                { this.props.error && <span>{this.props.error}</span> }
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
                <StudentTotal count={this.props.studentList.length} />

                <footer>
                    Student Registration demo app using the following:
                    <ul>
                        <li>React</li>
                        <li>Axios</li>
                        <li>Async operations handled via async/await</li>
                    </ul>
                    <em>NOTE: No additional Babel / Webpack plugins are required to get this project to run.</em>
                </footer>
            </div>
        );
    }
}
