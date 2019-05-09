import React from 'react';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

export default function Table(props) {
  return (
    <table
      id="studentTable"
      className="table table-striped table-hover table-sm"
    >
      <TableHeader />
      <TableBody {...props} />
    </table>
  );
}
