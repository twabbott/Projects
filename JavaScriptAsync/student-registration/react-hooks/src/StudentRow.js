import React from 'react';

export default function StudentRow({
    student,
    loading,
    onEditBtnClicked,
    onDeleteBtnClicked
}) {
    return (
        <tr>
            <td>{student.uvuId}</td>
            <td>{student.lastName}, {student.firstName}</td>
            <td>{student.male? "Male": "Female"}</td>
            <td>
                <button 
                    type="button" 
                    className="btn btn-info btn-sm" 
                    disabled={loading}
                    onClick={() => onEditBtnClicked(student)}>Edit</button>
            </td>
            <td>
                <button 
                    type="button" 
                    className="btn btn-danger btn-sm" 
                    disabled={loading}
                    onClick={() => onDeleteBtnClicked(student)}>Delete</button>
            </td>
        </tr>
    );
}
