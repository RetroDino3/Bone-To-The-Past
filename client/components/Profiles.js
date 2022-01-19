import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUsers, addUser, deleteUser } from '../store/users'

function Profiles(props) {
  const { user, id } = props

  useEffect(() => {
    props.loadProfiles()
  }, [])

  async function deleteProfileHandler(id) {
    props.deleteProfile(id)
  }

  return (
    <div>
      <h1>Profiles</h1>
      <div id="Profiles">
        {user.map((users) => (
          <div key={user.id}>
            <h3>{user.username}</h3>
            <button onClick={deleteProfileHandler}>Delete Profile</button>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapState = (state) => {
  return { id: state.auth.id, user: state.user }
}

const mapDispatch = (dispatch) => {
  return {
    loadProfiles: () => dispatch(fetchUsers),
    newProfile: (user) => dispatch(addUser(user)),
    deleteProfile: (id) => dispatch(deleteUser(id)),
  }
}

export default connect(mapState, mapDispatch)(Profiles)
