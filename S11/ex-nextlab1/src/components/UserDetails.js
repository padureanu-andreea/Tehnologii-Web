import React from 'react';

function UserDetails(props) {
  const { user, onCancel } = props;

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', background: '#f9f9f9' }}>
      <h2>User Details</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Type:</strong> {user.type}</p>
      
      <button onClick={onCancel} style={{ marginTop: '10px' }}>
        Inapoi la lista
      </button>
    </div>
  );
}

export default UserDetails;