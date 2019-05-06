import React from "react";
import { connect } from "react-redux";

import { showEditStudentFormAction } from "./store";
import { deleteStudentBeginAction } from "./store";

function mapDispatchToProps(dispatch) {
  return {
    onEditBtnClicked: student => dispatch(showEditStudentFormAction(student)),
    onDeleteBtnClicked: student =>
      dispatch(deleteStudentBeginAction(student.id))
  };
};

function TableRow(props) {
  const { uvuId, lastName, firstName, male } = props.student;

  const _onEditBtnClicked = () => {
    props.onEditBtnClicked(props.student);
  };

  const _onDeleteBtnClicked = () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`Are you sure you want to delete ${firstName} ${lastName}?`)) {
      return;
    }

    props.onDeleteBtnClicked(props.student);
  };

  return (
    <tr>
      <td>{uvuId}</td>
      <td>{lastName}, {firstName}</td>
      <td>{male ? "Male" : "Female"}</td>
      <td>
        <button
          type="button"
          className="btn btn-info btn-sm"
          onClick={_onEditBtnClicked}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={_onDeleteBtnClicked}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(TableRow);
