import React from 'react';

export default function StudentCount({ students }) {
  switch (students.length) {
    case 0:
      return <div>No students have registered.</div>;

    case 1:
      return <div>1 student.</div>;

    default:
      return <div>{students.length} students.</div>;
  }
}
