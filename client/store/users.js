import axios from 'axios'

//Action Types
const SET_USERS = 'SET_USERS'
const ADD_USER = 'ADD_USER'
const DELETE_USER = 'DELETE_USER'

//Action Creators
export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  }
}

const _addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  }
}

const _deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  }
}

//Thunk Creators
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token')
      const { data } = await axios.get('api/users/', {
        headers: {
          authorization: token,
        },
      })
      dispatch(setUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token')
      const { data: userAdd } = await axios.post('api/users/', user, {
        headers: {
          authorization: token,
        },
      })
      dispatch(_addUser(userAdd))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token')
      const { data: user } = await axios.delete(`api/users/${id}`, {
        headers: {
          authorization: token,
        },
      })
      dispatch(_deleteUser(user))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function users(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id)
    case ADD_USER:
      return [...state, action.user]
    default:
      return state
  }
}
