import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial State
const initialState = {
  notes: []
}

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  const removeNote = (id) => {
    dispatch({
      type: 'REMOVE_NOTE',
      payload: id
    })
  }

  const addNote = (note) => {
    dispatch({
      type: 'ADD_NOTE',
      payload: note
    })
  }

  const editNote = (note) => {
    dispatch({
      type: 'EDIT_NOTE',
      payload: note
    })
  }

  return (
    <GlobalContext.Provider value={{
      notes: state.notes,
      removeNote,
      addNote,
      editNote
    }}>
      {children}
    </GlobalContext.Provider>
  )
}