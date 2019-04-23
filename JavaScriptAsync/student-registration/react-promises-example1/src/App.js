import React, { Component } from "react";
import StudentTable from "./studentTable";
import StudentForm from "./studentForm";

import * as model from './studentService';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            studentList: [],
            student: null,
            showForm: false,
            updating: false,
            error: undefined
        } 

        this._onCreateBtnClicked = this._onCreateBtnClicked.bind(this);
        this._onCancelBtnClicked = this._onCancelBtnClicked.bind(this);
        this._onEditBtnClicked = this._onEditBtnClicked.bind(this);
        this._onDeleteBtnClicked = this._onDeleteBtnClicked.bind(this);

        this._onCreateConfirmed = this._onCreateConfirmed.bind(this);
        this._onEditConfirmed = this._onEditConfirmed.bind(this);
    }

    componentDidMount() {
        this.setState({ updating: true });
        const studentList = model.getAllStudents()
            .then(
                studentList => {
                    this.setState({ 
                        studentList,
                        updating: false,
                        error: undefined
                    })
                },
                error => {
                    this.setState({ 
                        studentList: [],
                        updating: false,
                        error
                    });
                    console.log(error);
                }
            );
    }

    _onCreateBtnClicked() {
        this.setState({
            student: undefined,
            showForm: true
        });
    }

    _onEditBtnClicked(student) {
        this.setState({ 
            student,
            showForm: true
        })
    }

    _onDeleteBtnClicked(student) {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm(`Are you sure you want to delete ${student.sortableName()}?`)) {
            return;
        }

        this.setState({ loading: true, error: undefined });
        model.deleteStudent(student.id)
            .then(
                () => model.getAllStudents(),
                error => this.setState({ error })
            )
            .then(
                studentList => this.setState({ studentList })
            )
            .finally(
                () => this.setState({ loading: false })
            );
    }

    _onCancelBtnClicked() {
        this.setState({
            showForm: false
        });
    }

    _onCreateConfirmed(id, firstName, lastName, isMale, uvuId, race, age, isVeteran) {
        this.setState({ loading: true, error: undefined });
        model.createStudent(firstName, lastName, isMale, uvuId, race, age, isVeteran)
            .then(
                () => model.getAllStudents(),
                error => this.setState({ error })
            )
            .then(
                studentList => this.setState({
                    student: null,
                    showForm: false,
                    studentList
                })
            )
            .finally(
                () => this.setState({ loading: false })
            );
    }

    _onEditConfirmed(id, firstName, lastName, isMale, uvuId, race, age, isVeteran) {
        this.setState({ loading: true, error: undefined });
        model.updateStudent(id, firstName, lastName, isMale, uvuId, race, age, isVeteran)
            .then(
                () => model.getAllStudents(),
                error => this.setState({ error })
            )
            .then(
                studentList => this.setState({
                    student: null,
                    showForm: false,
                    studentList
                })
            )
            .finally(
                () => this.setState({ loading: false })
            );
    }

    render() {
        return (
          <div class="container">
            { this.state.showForm && this.state.student && 
              <StudentForm
                student={this.state.student}
                onSubmit={this._onEditConfirmed}
                onCancelBtnClicked={this._onCancelBtnClicked}
              />
            }
            { this.state.showForm && !this.state.student &&
              <StudentForm 
                onSubmit={this._onCreateConfirmed}
                onCancelBtnClicked={this._onCancelBtnClicked} />}
                     
            { !this.state.showForm &&
              <StudentTable
                studentList={this.state.studentList}
                updating={this.state.updating}
                error={this.state.error}
                onCreateBtnClicked={this._onCreateBtnClicked}
                onEditBtnClicked={this._onEditBtnClicked}
                onDeleteBtnClicked={this._onDeleteBtnClicked}
              /> 
            }
          </div>
        );
      }
    }

