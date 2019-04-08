import React from 'react';

export default function User({user}) {
  return (
    <React.Fragment key={user.username}>
      <hr />
      <div style={{ display: 'flex' }}>
        <img
          alt={user.username}
          src={user.photo}
          style={{
            borderRadius: '50%',
            height: 72,
            marginRight: 20,
            width: 72,
          }}
        />
        <div>
          <h2 style={{ marginTop: 0 }}>
            @{user.username}
          </h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
      <div>Hobbies:</div>
      <ol>
        {user.hobbies.map(hobby => <li>{hobby}</li>)}
      </ol>
    </React.Fragment>
  );
}