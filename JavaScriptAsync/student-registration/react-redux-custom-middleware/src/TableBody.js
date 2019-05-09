import React from 'react';

import TableRow from './TableRow';

export default function TableBody({students, ...others}) {
  const studentList = students.map(student => (
    <TableRow key={student.id} student={student} {...others} />
  ));

  return <tbody>{studentList}</tbody>
}