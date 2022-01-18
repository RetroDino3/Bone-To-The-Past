import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUserSaves, createNewSave } from '../store/saves'

function Saves(props) {
  const { saves, id } = props

  useEffect(() => {
    props.loadSaves(id)
  }, [])

  async function newSaveHandler() {
    props.newSave(id)
  }

  return (
    <div>
      <h1>Select Saved Game</h1>
      <button onClick={newSaveHandler}>Create New Game</button>
      <div id="allSaves">
        {saves.map((save) => (
          <div className="singleSave" key={save.id}>
            <p>
              {save.updatedAt.slice(0, 10)}, {save.updatedAt.slice(11, 19)}
            </p>
            <p>{save.playerHealth}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapState = (state) => {
  return { id: state.auth.id, saves: state.saves }
}

const mapDispatch = (dispatch) => {
  return {
    loadSaves: (id) => dispatch(fetchUserSaves(id)),
    newSave: (userId) => dispatch(createNewSave(userId)),
  }
}

export default connect(mapState, mapDispatch)(Saves)
