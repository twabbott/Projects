import React, { Component } from 'react';

export default class StudentRow extends Component {
    constructor(props) {
        super(props);

        this._onEditBtnClicked = this._onEditBtnClicked.bind(this);
        this._onDeleteBtnClicked = this._onDeleteBtnClicked.bind(this);
    }

    _onEditBtnClicked() {
        this.props.onEditBtnClicked(this.props.student);
    }

    _onDeleteBtnClicked() {
        this.props.onDeleteBtnClicked(this.props.student);
    }

    render() {
        return (
            <tr>
                <td>{this.props.student.uvuId}</td>
                <td>{this.props.student.lastName}, {this.props.student.firstName}</td>
                <td>{this.props.student.male? "Male": "Female"}</td>
                <td>
                    <button type="button" className="btn btn-info btn-sm"
                        onClick={this._onEditBtnClicked}>Edit</button>
                </td>
                <td>
                    <button type="button" className="btn btn-danger btn-sm"
                        onClick={this._onDeleteBtnClicked}>Delete</button>
                </td>
            </tr>
        );
    }
}
