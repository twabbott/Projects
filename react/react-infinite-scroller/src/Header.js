import React from 'react';
import { AST_PropAccess } from 'terser';

export default function Footer(props) {
  const style = {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#0c0c0c',
    color: 'white',
    textAlign: 'center'
  };

  return (
    <div style={style}>
      {props.children}
    </div>
  );
}