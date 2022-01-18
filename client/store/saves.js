import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_SAVES = 'SET_SAVES'
const ADD_SAVE = 'ADD_SAVE'
const DELETE_SAVE = 'DELETE_SAVE'
const UPDATE_SAVE = 'UPDATE_SAVE'

/**
 * ACTION CREATORS
 */
const setSaves = (saves) => ({ type: SET_SAVES, saves })

const addSave = (save) => ({ type: ADD_SAVE, save })

const _updateSave = (save) => ({ type: UPDATE_SAVE, save })

const _deleteSave = (save) => ({ type: DELETE_SAVE, save })

/**
 * THUNK CREATORS
 */
export const fetchUserSaves = (id) => {
  return async (dispatch) => {
    try {
      const { data: saves } = await axios.get(`/api/users/${id}/saves`)
      dispatch(setSaves(saves))
    } catch (err) {
      console.error(err)
    }
  }
}

export const createNewSave = (userId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token')
      const { data: newSave } = await axios.post('/api/saves', {
        userId,
        headers: { authorization: token },
      })
      dispatch(addSave(newSave))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateSave = (save) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token')
      const { data: newSave } = await axios.put(`/api/saves/${save.id}`, {
        body: save,
        headers: { authorization: token },
      })
      dispatch(_updateSave(newSave))
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteSave = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token')
      const { data: save } = await axios.delete(`/api/saves/${id}`, {
        headers: {
          authorization: token,
        },
      })
      dispatch(_deleteSave(save))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_SAVES:
      return action.saves
    case ADD_SAVE:
      return [...state, action.save]
    case DELETE_SAVE:
      return state.filter((save) => save.id !== action.save.id)
    case UPDATE_SAVE:
      return state.map((save) => {
        save.id === action.save.id ? action.save : save
      })
    default:
      return state
  }
}
