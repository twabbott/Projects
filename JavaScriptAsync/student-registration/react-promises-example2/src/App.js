import React, { Component } from "react";
import StudentTable from "./StudentTable";
import StudentForm from "./StudentForm";

import * as model from './studentService';

export default class App extends Component {
    state = {
        studentList: [],
        student: null,
        showForm: false,
        loading: false,
        error: null
    } 

    componentDidMount() {
        this.setState({ loading: true, error: undefined });
        model.getAllStudents()
            .then(studentList => this.setState({ studentList }))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    }

    _onCreateBtnClicked = () => {
        this.setState({
            student: undefined,
            showForm: true,
            error: null
        });
    }

    _onEditBtnClicked = (student) => {
        this.setState({ 
            student,
            showForm: true,
            error: null
        })
    }

    _onDeleteBtnClicked = (student) => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
            return;
        }

        this.setState({ loading: true, error: undefined });
        model.deleteStudent(student.id)
            .then(() => model.getAllStudents())
            .then(studentList => this.setState({ studentList }))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    }

    _onCancelBtnClicked = () => {
        this.setState({
            showForm: false
        });
    }

    _onCreateConfirmed = (id, firstName, lastName, isMale, uvuId, race, age, isVeteran) => {
        this.setState({ loading: true, error: undefined });
        model.createStudent(firstName, lastName, isMale, uvuId, race, age, isVeteran)
            .then(() => model.getAllStudents())
            .then(
                studentList => this.setState({
                    student: null,
                    showForm: false,
                    studentList
                })
            )
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    }

    _onEditConfirmed = (id, firstName, lastName, isMale, uvuId, race, age, isVeteran) => {
        this.setState({ loading: true, error: undefined });
        model.updateStudent(id, firstName, lastName, isMale, uvuId, race, age, isVeteran)
            .then(() => model.getAllStudents())
            .then(
                studentList => this.setState({
                    student: null,
                    showForm: false,
                    studentList
                })
            )
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));
    }

    render() {
        return (
            <div className="container">
                {this.state.showForm && this.state.student && 
                    <StudentForm 
                        student={this.state.student}
                        loading={this.state.loading}
                        error={this.state.error}
                        onSubmit={this._onEditConfirmed}
                        onCancelBtnClicked={this._onCancelBtnClicked} />}

                {this.state.showForm && !this.state.student &&
                    <StudentForm 
                        onSubmit={this._onCreateConfirmed}
                        loading={this.state.loading}
                        error={this.state.error}
                        onCancelBtnClicked={this._onCancelBtnClicked} />}
                        
                {!this.state.showForm &&
                    <StudentTable 
                        studentList={this.state.studentList}
                        onCreateBtnClicked={this._onCreateBtnClicked}
                        onEditBtnClicked={this._onEditBtnClicked}
                        onDeleteBtnClicked={this._onDeleteBtnClicked}
                        loading={this.state.loading}
                        error={this.state.error} />}
            </div>
        );
    }
}

