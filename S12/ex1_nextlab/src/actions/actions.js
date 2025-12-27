// export function addNote (content) {
//   console.warn(content)
//   return {
//     type: 'ADD_NOTE',
//     payload: content
//   }
// }

// export function removeNote (index) {
//   return {
//     type: 'REMOVE_NOTE',
//     payload: index
//   }
// }


const SERVER = 'http://localhost:8080'

export function getNotes () {
  return {
    type: 'GET_NOTES',
    payload: async () => {
      const response = await fetch(`${SERVER}/notes`)
      const data = await response.json()
      return data
    }
  }
}

export function addNote(content) {
  return {
    type: 'ADD_NOTE',
    payload: fetch(`${SERVER}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    }).then(response => response.json())
  }
}

export function deleteNote(noteId) {
  return {
    type: 'DELETE_NOTE',
    payload: fetch(`http://localhost:8080/notes/${noteId}`, {
      method: 'DELETE'
    }).then(() => noteId) 
  }
}