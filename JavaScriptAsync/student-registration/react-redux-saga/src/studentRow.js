import React from 'react';
import { connect } from "react-redux";

import { showEditStudentFormAction } from "./store";
import { deleteStudentBeginAction } from "./store";

const mapDispatchToProps = dispatch => {
    return {
        onEditBtnClicked: student => dispatch(showEditStudentFormAction(student)),
        onDeleteBtnClicked: student => dispatch(deleteStudentBeginAction(student.id))
    };
}

const StudentRow = (props) => {
    const _onEditBtnClicked = () => {
        props.onEditBtnClicked(props.student);
    }

    const _onDeleteBtnClicked = () => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm(`Are you sure you want to delete ${_sortableName()}?`)) {
            return;
        }

        props.onDeleteBtnClicked(props.student);
    }

    const _sortableName = () => {
        return `${props.student.lastName}, ${props.student.firstName}`;
    }

    return (
        <tr>
            <td>{props.student.uvuId}</td>
            <td>{_sortableName()}</td>
            <td>{props.student.male? "Male": "Female"}</td>
            <td>
                <button type="button" className="btn btn-info btn-sm"
                    onClick={_onEditBtnClicked}>Edit</button>
            </td>
            <td>
                <button type="button" className="btn btn-danger btn-sm"
                    onClick={_onDeleteBtnClicked}>Delete</button>
            </td>
        </tr>
    );
}

export default connect(null, mapDispatchToProps)(StudentRow);