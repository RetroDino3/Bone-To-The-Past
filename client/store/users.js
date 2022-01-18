import axios from 'axios'

const RETRIEVE_USER_SAVED_DATA = 'RETRIEVE_USER_SAVED_DATA'

const setSaveGame = (game) => ({ type: RETRIEVE_USER_SAVED_DATA, game })

export const fetchSaveGame = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${userId}`)
    console.log(`/api/users/${userId}`)
    dispatch(setSaveGame(data))
  } catch (error) {
    console.log(error)
  }
}

const initialState = {}

export default function fetchSaveGame(state = initialState, action) {
  switch (action.type) {
    case RETRIEVE_USER_SAVED_DATA:
      return action.game
    default:
      return state
  }
}
