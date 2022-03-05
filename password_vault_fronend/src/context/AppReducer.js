export default (state, action) => {
  switch (action.type) {
    case 'REMOVE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => {
          return note.id !== action.payload;
        })
      }
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [action.payload, ...state.notes]
      }
    case 'EDIT_NOTE':
      const updatenote = action.payload;

      const updatenotes = state.notes.map(note => {
        if (note.id === updatenote.id) {
          return updatenote;
        }
        return note;
      })
      return {
        ...state,
        notes: updatenotes
      }

    default:
      return state;
  }
}