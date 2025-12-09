import React from 'react';
import './User.css';

function AdminUser(props) {
  const { item } = props;

  return (
    <div className='user admin'>
      <div className='username' style={{ backgroundColor: 'red', color: 'white' }}>
        ADMIN: {item.username}
      </div>
      <div className='fullName' style={{ backgroundColor: '#ffcccc' }}>
        {item.fullName}
      </div>
    </div>
  );
}

export default AdminUser;