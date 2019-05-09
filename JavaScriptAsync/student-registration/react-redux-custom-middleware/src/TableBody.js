import React from 'react';

import TableRow from './TableRow';

export default function TableBody({students}) {
  const studentList = students.map(student => (
    <TableRow key={student.id} student={student} />
  ));

  return <tbody>{studentList}</tbody>
}