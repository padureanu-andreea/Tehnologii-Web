// const INITIAL_STATE = {
//   notes: []
// }

// export default function reducer (state = INITIAL_STATE, action) {
//   switch (action.type) {
//     case 'ADD_NOTE':
//       return { ...state, notes: [...state.notes, action.payload] }
//     case 'REMOVE_NOTE':
//       return { ...state, notes: state.notes.filter((_, i) => i !== action.payload) }
//     default:
//       return state
//   }
// }


const INITIAL_STATE = {
  notes: [],
  error: null,
  fetching: false,
  fetched: false
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_NOTES_PENDING':
      return { ...state, error: null, fetching: true, fetched: false }
    case 'GET_NOTES_FULFILLED':
      return { ...state, notes: action.payload, fetching: false, fetched: true }
    case 'GET_NOTES_REJECTED':
      return { ...state, error: action.payload, fetching: false, fetched: false }
    case 'DELETE_NOTE_FULFILLED':
      return { ...state, notes: state.notes.filter(note => note.id !== action.payload) }
    default:
      return state
  }
}