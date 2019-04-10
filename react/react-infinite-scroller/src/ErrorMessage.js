import React from 'react';

export default function ErrorMessage({children}) {
  return (
    <div style={{ color: '#900' }}>
      {children}
    </div>
  );
}