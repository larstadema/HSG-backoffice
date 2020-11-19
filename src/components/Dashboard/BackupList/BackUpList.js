import React from 'react'
import { connect, useSelector } from 'react-redux'
import _ from 'underscore'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import UserIcon from '@material-ui/icons/Person'
import DeleteIcon from '@material-ui/icons/Delete'

import { toggleBackup, deleteBackup } from '../../../redux/actions/userActions'

const Todo = ({ todo, id, toggleBackup, deleteBackup }) => (
  <List>
    <ListItem key={id}>
      <ListItemIcon>
        <UserIcon onClick={() => toggleBackup(id)}/>
      </ListItemIcon>
      <ListItemText
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}
        primary={todo.content}
        onClick={() => toggleBackup(id)}
      />
      <ListItemSecondaryAction >
        <IconButton edge="end" aria-label="delete" onClick={() => deleteBackup(id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  </List>
)

function TodoList({ toggleBackup, deleteBackup }) {
  let todos = useSelector((state) => state.user.backup)

  return _.keys(todos).map((id) => (
    <Todo key={id} id={id} toggleBackup={toggleBackup} todo={todos[id]} deleteBackup={deleteBackup} />
  ))
}

const mapStateToProps = (state) => ({
  todos: state.user.backup,
})

export default connect(mapStateToProps, { toggleBackup, deleteBackup })(TodoList)
