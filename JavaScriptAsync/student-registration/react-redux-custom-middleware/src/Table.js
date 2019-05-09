import React from 'react';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

export default function Table({students}) {
  return (
    <table
      id="studentTable"
      className="table table-striped table-hover table-sm"
    >
      <TableHeader />
      <TableBody students={students} />
    </table>
  );
}
