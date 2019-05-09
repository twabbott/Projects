import React from "react";

export default function TableRow(props) {
  const { id, uvuId, lastName, firstName, male } = props.student;

  const _onEditBtnClicked = () => {
    props.showEditStudentFormAction(props.student);
  };

  const _onDeleteBtnClicked = () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`Are you sure you want to delete ${firstName} ${lastName}?`)) {
      return;
    }

    props.deleteStudentBeginAction(id);
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
