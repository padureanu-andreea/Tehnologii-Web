import './UserList.css'
import { useEffect, useState } from 'react'
import User from './User'
import UserForm from './UserForm'
import UserDetails from './UserDetails'

const SERVER = 'http://localhost:8080'

function UserList () {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  const getUsers = async () => {
    const response = await fetch(`${SERVER}/users`)
    const data = await response.json()
    setUsers(data)
  }

  const addUser = async (user) => {
    await fetch(`${SERVER}/users`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  if (selectedUser) {
    return <UserDetails user={selectedUser} onCancel={() => setSelectedUser(null)} />
  }

  return (
    <div className='user-list'>
      {
        users.map(e => (
          <User key={e.id} item={e} onSelect={(u) => setSelectedUser(u)} />
        ))
      }
      <UserForm onAdd={addUser} />
    </div>
  )
}

export default UserList